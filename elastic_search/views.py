from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from elasticsearch import Elasticsearch


class SearchView(APIView):
    def get(self, request):
        es = Elasticsearch('http://116.125.119.111:8000')

        # 검색어
        search_word = request.query_params.get('search', None)
        index = request.query_params.get('index', None)

        if not search_word:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'search word param is missing'})

        if index == 'company':
            docs = es.search(
                index='company',
                body={
                    "query": {
                        "multi_match": {
                            "query": search_word,
                            "fields": [
                                'label'
                            ]
                        },

                    }
                })
            data_list = []
            # print('docs[hits][hits]', docs['hits'])
            for product in docs['hits']['hits']:
                data_list.append(product.get('_source'))
            return Response({'data': data_list}, status=200)
            # return Response({'data': docs['hits']}, status=200)

        elif index == 'jikjong':
            docs = es.search(
                index='jikjong',
                body={
                    "query": {
                        "multi_match": {
                            "query": search_word,
                            "fields": [
                                'jikjong_low_name', 'jikjong_mid_name', 'description', 'skill'
                            ]
                        },

                    }
                })
            data_list = []
            for product in docs['hits']['hits']:
                data_list.append(product.get('_source'))
            return Response({'data': data_list}, status=200)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'index None'})