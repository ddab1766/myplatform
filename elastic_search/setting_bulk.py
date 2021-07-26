# elastic_search/setting_bulk.py
from elasticsearch import Elasticsearch
import json

es = Elasticsearch('116.125.119.111:8000')



'''
Company Index
'''
# res = es.indices.delete(index='company', ignore=[400, 404])
# print('delete', res)
# body = {
#     "settings": { # 색인(index) 정의
#         "number_of_shards" : 2, # 샤드 개수
#         "number_of_replicas": 1, # 레플리카 개수
#         "index": { # 색인 전체 설정
#             "analysis": {
#                 "analyzer": {
#                     "nori_analyzer": { # 사용자 정의 분석기
#                         "type": "custom",
#                         # "tokenizer": "nori_user_dict",# 토크나이저 설정
#                         "tokenizer": "nori_tokenizer",# 토크나이저 설정
#                         "filter": ["my_posfilter"]
#                     }
#                 },
#                 "tokenizer": {
#                     "nori_user_dict": { # 토크나이저 정의
#                         "type": "nori_tokenizer", # 한글 분석기 (nori)
#                         "decompound_mode": "mixed", #토큰을 처리하는 방법, 분해하지 않는다(none), 분해하고 원본삭제(discard), 분해하고 원본 유지(mixed)
#                         "user_dictionary": "userdict_ko.txt"
#                     }
#                 },
#                 "filter": {
#                     "my_posfilter": { #제거 할 불용어들
#                         "type": "nori_part_of_speech",
#                         "stoptags": ["E", "IC","J","MAG", "MAJ", "MM", "SP", "SSC", "SSO", "SC", "SE", "XPN", "XSA", "XSN", "XSV", "UNA", "NA", "VSV"]
#                     }
#                 }
#             }
#         }
#     },
#     "mappings": {
#         "properties": {
#             # "author": { "type": "text" }, #작성자
#             # "post_create_datetime": { "type": "date"},#글 작성시간
#             "label": {"type": "text", "analyzer": "nori_analyzer", "search_analyzer": "nori_analyzer"},# 제목
#             # "content": {"type": "text", "analyzer": "nori_analyzer"}, #글 내용
#             # "url":{"type": "text", "index": "false"},#글 URL
#             # "publisher": {"type": "keyword"}, #글 출처 출판사(보안뉴스, 트위터 등)
#             # "tag": {"type": "keyword"},#태그
#         }
#     }
# }

# res = es.indices.create(index='company', body=body, ignore=[400, 404])
# print('create', res)
#
#
# with open("CompanyBaseInfo.json", encoding='utf-8') as json_file:
#     json_data = json.loads(json_file.read())
#
# body = ""
# count = 0
# for i in json_data:
#     body = body + json.dumps({"index": {"_index": "company"}}) + '\n'
#     body = body + json.dumps(i, ensure_ascii=False) + '\n'
#
#     if count == 100:
#         res = es.bulk(body)
#         body = ""
#         count = 0
#
#     count += 1
#     print('i:', i)
#
# es.bulk(body)


# '''
# Jikjong Index
# '''
res = es.indices.delete(index='jikjong', ignore=[400, 404])
print('delete', res)
body = {
    "settings": { # 색인(index) 정의
        "number_of_shards" : 2, # 샤드 개수
        "number_of_replicas": 1, # 레플리카 개수
        "index": { # 색인 전체 설정
            "analysis": {
                "filter": {
                    "my_posfilter": { #제거 할 불용어들
                        "type": "nori_part_of_speech",
                        "stoptags": ["E", "IC","J","MAG", "MAJ", "MM", "SP", "SSC", "SSO", "SC", "SE", "XPN", "XSA", "XSN", "XSV", "UNA", "NA", "VSV"]
                    }
                },
                "tokenizer": {
                    "nori_user_dict": { # 토크나이저 정의
                        "type": "nori_tokenizer", # 한글 분석기 (nori)
                        "decompound_mode": "mixed", #토큰을 처리하는 방법, 분해하지 않는다(none), 분해하고 원본삭제(discard), 분해하고 원본 유지(mixed)
                        "user_dictionary": "userdict_ko.txt"
                    }
                },
                "analyzer": {
                    "nori_analyzer": { # 사용자 정의 분석기
                        "type": "custom",
                        "tokenizer": "nori_user_dict",# 토크나이저 설정
                        # "tokenizer": "nori_tokenizer",# 토크나이저 설정
                        # "filter": ["my_posfilter"]
                    }
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "jikjong_top_name": {"type": "text", "analyzer": "nori_analyzer", "search_analyzer": "nori_analyzer"},
            "jikjong_mid_name": {"type": "text", "analyzer": "nori_analyzer"},
            "jikjong_low_name": {"type": "text", "analyzer": "nori_analyzer"},
            "description": {"type": "text", "analyzer": "nori_analyzer"},
            "skill": {"type": "text", "analyzer": "nori_analyzer"},
            "pagyeon_code": {"type": "text", "analyzer": "nori_analyzer"},
        }
    }
}
res = es.indices.create(index='jikjong', body=body, ignore=[400, 404])
print('create', res)

with open("Jikjong_rev05.json", encoding='utf-8') as json_file:
    json_data = json.loads(json_file.read())

body = ""
count = 0
for i in json_data:
    body = body + json.dumps({"index": {"_index": "jikjong"}}) + '\n'
    body = body + json.dumps(i, ensure_ascii=False) + '\n'

    if count == 100:
        res = es.bulk(body)
        body = ""
        count = 0
        print('res:', res)

    count += 1
    # print('i:', i)

es.bulk(body)

# es.indices.create(
#     index='jikjong',
#     body={
#         "settings": {
#             "index": {
#                 "analysis": {
#                     "analyzer": {
#                         "my_analyzer": {
#                             "type": "custom",
#                             "tokenizer": "nori_user_dict"
#                         }
#                     },
#                     "tokenizer": {
#                         "nori_user_dict": {
#                             "type": "nori_tokenizer",
#                             "decompound_mode": "mixed",
#                             "user_dictionary": "userdict_ko.txt",
#                             # "tokenizer": "nori_user_dict"
#                             # "tokenizer": "nori_tokenizer"
#                         }
#                     },
#                 }
#             }
#         },
#         "mappings": {
#             "dictionary_datas": {
#                 "properties": {
#                     "label": {
#                         "type": "text",
#                         "analyzer": "my_analyzer"
#                     },
#                     "M": {
#                         "type": "text",
#                         "analyzer": "my_analyzer"
#                     }
#                 }
#             }
#         }
#     }
# )
#

