from django.test import TestCase

# Create your tests here.
li = []
for _ in range(int(input())):   # 숫자 길이만큼 반복
    age, name = input().split() # 나이 이름 공백으로 받기
    li.append((int(age), name)) # 튜플 저장
li.sort(key=lambda x : x[0]) #lambda 를 통해 튜플의 0번째 나이값만 sort
for i in li:
    print(i[0],i[1]) #출력

word = input().split() # 문자열받기
word_ex = list(set(word)) # set 중복허용 x
print(word_ex,",",len(word_ex)) #출력