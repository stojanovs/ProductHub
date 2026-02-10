import datetime
from rest_framework.response import Response
from rest_framework import status
from mongo_auth.utils import productsCol
from bson import ObjectId
from mongo_auth.utils import parse_json
from rest_framework.decorators import permission_classes
from mongo_auth.permissions import AuthenticatedOnly, AdminOnly
from rest_framework.views import APIView


def normalize_product(product):
    """
    Normalize product price to float before serialization.
    Handles Decimal128 and other formats from MongoDB.
    """
    if not product:
        return product
    
    normalized = parse_json(product) if isinstance(product, dict) and '_id' in product else product
    
    # Convert price to float
    if 'price' in normalized:
        price = normalized['price']
        if isinstance(price, dict) and '$numberDecimal' in price:
            normalized['price'] = float(price['$numberDecimal'])
        else:
            try:
                normalized['price'] = float(price)
            except (ValueError, TypeError):
                normalized['price'] = 0
    
    return normalized


def normalize_products(products):
    """Normalize a list of products."""
    return [normalize_product(p) for p in products]


@permission_classes([AuthenticatedOnly])
class List_and_Add_Products(APIView):
    def get(self, request):
        """
        List Products View with Pagination and Filtering
        Query params: page (default 1), limit (default 10), name, minPrice, maxPrice
        """

        try:
            page = int(request.query_params.get('page', 1))
            limit = int(request.query_params.get('limit', 10))
            skip = (page - 1) * limit
            
            filter_query = {}
            
            name_filter = request.query_params.get('name')
            if name_filter:
                filter_query['name'] = {'$regex': name_filter, '$options': 'i'}
            
            min_price = request.query_params.get('minPrice')
            max_price = request.query_params.get('maxPrice')
            if min_price or max_price:
                price_filter = {}
                try:
                    if min_price:
                        price_filter['$gte'] = float(min_price)
                    if max_price:
                        price_filter['$lte'] = float(max_price)
                    filter_query['price'] = price_filter
                except (ValueError, TypeError):
                    pass
            
            total_count = productsCol.count_documents(filter_query)
            products = productsCol.find(filter_query).skip(skip).limit(limit)
            
            return Response({
                'products': normalize_products(list(products)),
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total_count,
                    'pages': (total_count + limit - 1) // limit
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print('Exception in listing products: ', e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"data": {"error_msg": str(e)}})

    def post(self, request):
        """
        Add Product View
        """
        try:
            data = request.data

            productAdd = {
                "name": data['name'],
                "quantity": data['quantity'],
                "price": data['price'],
                "image": data.get('image'),
                "createdAt": datetime.datetime.utcnow(),
                "updatedAt": datetime.datetime.utcnow(),
                "modifiedAt": None
            }

            productsCol.insert_one(productAdd)
            return Response({'message': 'Product Added'}, status=status.HTTP_200_OK)

        except Exception as e:
            print('Exception in adding product: ', e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"data": {"error_msg": str(e)}})


@permission_classes([AuthenticatedOnly])
class View_Update_Delete_Product(APIView):
    def get(self, request, pk):
        """
        List One Product View
        """

        try:
            product = productsCol.find_one({'_id': ObjectId(pk)})

            if product:
                return Response({'product': normalize_product(product)}, status=status.HTTP_200_OK)

            else:
                return Response({'message': 'Product not found'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print('Exception in listing one product: ', e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"data": {"error_msg": str(e)}})

    def put(self, request, pk):
        """
        Update Product View (Admin only)
        """
        try:
            if request.user.get('role') != 'admin':
                return Response({'detail': 'Only admins can update products'}, status=status.HTTP_403_FORBIDDEN)
            
            data = request.data

            productUpdate = {
                "name": data['name'],
                "quantity": data['quantity'],
                "price": data['price'],
                "updatedAt": datetime.datetime.utcnow()
            }

            if 'image' in data:
                productUpdate["image"] = data.get('image')

            findProduct = productsCol.find_one({'_id': ObjectId(pk)})

            if findProduct:
                productsCol.update_one({'_id': ObjectId(pk)}, {
                                       '$set': productUpdate})
                return Response({'message': 'Product Updated'}, status=status.HTTP_200_OK)

            else:
                return Response({'message': 'Product not found'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print('Exception in updating product: ', e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"data": {"error_msg": str(e)}})

    def delete(self, request, pk):
        """
        Delete Product View (Admin only)
        """
        try:
            if request.user.get('role') != 'admin':
                return Response({'detail': 'Only admins can delete products'}, status=status.HTTP_403_FORBIDDEN)
            
            findProduct = productsCol.find_one({'_id': ObjectId(pk)})

            if findProduct:
                productsCol.delete_one({"_id": ObjectId(pk)})
                return Response({'message': 'Product deleted'}, status=status.HTTP_200_OK)

            else:
                return Response({'message': 'Product not found'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print('Exception in deleting product: ', e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"data": {"error_msg": str(e)}})
