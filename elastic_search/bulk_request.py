import requests, json, time, threading
import schedule

# with open("Jikjong_rev04.json", encoding='utf-8') as json_file:
with open("CompanyBaseInfo.json", encoding='utf-8') as json_file:
    json_data = json.loads(json_file.read())

def job():

    f = open('start_number.txt', 'r')
    line = int(f.readline())
    print('line:',line)
    f.close()

    body = []
    count = 0
    for i in json_data[line:]:

        # body = body + json.dumps({"index": {"_index": "company"}}) + '\n'
        # body = body + json.dumps(i, ensure_ascii=False) + '\n'

        body.append(dict(i))
        count += 1
        if count == 100:
            # url = 'https://42398c563e91434ebffe97cfdc95d449.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/chaegong/documents'
            # url = 'https://9f7c02c5019b47909f20102fb4b6e6d8.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/company/documents'
            # url = 'https://696ffa3b9c50480188e36a22dfd350d0.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/jikjong/documents'
            url = 'https://3969d1fa81fc4119a7b566d2c31358bc.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/company-baseinfo/documents'
            headers = {
                'Content-type': 'application/json',
                # 'Authorization': 'Bearer ' + 'private-rhqnckeqo1dit4uo9esbtnfd'
                # 'Authorization': 'Bearer ' + 'private-87ghoogcrjgfp4dxvh9gse7u'
                # 'Authorization': 'Bearer ' + 'private-gt77ceqjedg3c28d2b6bvam4'
                'Authorization': 'Bearer ' + 'private-w73s892j6smmfnwucmyhytnq'
            }
            response = requests.post(url, headers=headers, data=json.dumps(body))
            count = 0
            # print('start_number ',start_number)
            print('i:', i, f'{response.text}')
            break
    f2 = open('start_number.txt', 'w')
    f2.write(str(line + 100))
    f2.close()


schedule.every(1).seconds.do(job)


while True:
    schedule.run_pending()
    time.sleep(1)



# DELETE
# url = 'https://696ffa3b9c50480188e36a22dfd350d0.ent-search.asia-northeast1.gcp.cloud.es.io/api/as/v1/engines/jikjong'
# headers = {
#     'Content-type': 'application/json',
#     'Authorization': 'Bearer ' + 'private-gt77ceqjedg3c28d2b6bvam4'
# }
# response = requests.delete(url, headers=headers)
# print(response.text)