from allauth.account.signals import user_signed_up
from allauth.account.utils import user_field
from allauth.exceptions import ImmediateHttpResponse
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.socialaccount.adapter import get_adapter as get_account_adapter
from allauth.utils import import_attribute
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from backend.models import User
from backend.serializers import RegisterSerializer
import requests
from company_profile.models import CompanyProfile
from user_profile.models import UserProfile


class SocialAccountRegisterAdapter(DefaultSocialAccountAdapter):
    # def pre_social_login(self, request, sociallogin):
    #     print('pre_social_login')
    #     if sociallogin.user.id:
    #         print('?')
    #         return
    #     if request.user and request.user.is_authenticated:
    #         print('??')
    #         try:
    #             login_user = User.objects.get(email=request.user)
    #             sociallogin.connect(request, login_user)
    #         except User.DoesNotExist:
    #             pass
    def populate_user(self, request, sociallogin, data):
        user = super().populate_user(request, sociallogin, data)
        try:
            picture = sociallogin.account.extra_data['picture']
            name = sociallogin.account.extra_data['name']
            user_field(user, "profile_image", picture)
            user_field(user, "nickname", name)
        except (KeyError, AttributeError):
            pass
        return user

    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)

        try:
            user.nickname = sociallogin.account.extra_data['name']
        except:
            pass

        user.save()
        # todo 추천인 수정必
        # recuser = self.request.get('recuser', None)
        UserProfile.objects.create(
            user=user,
            # recuser=serializer.validated_data['recuser']
        )
        return user

class KaKaoAccountAdapter(DefaultSocialAccountAdapter):
    # def new_user(self, request, sociallogin):
    #     user = sociallogin.save(request)
    #     print(" new_user : ", self, request, sociallogin)
    #     # return get_account_adapter().new_user(request)
    #     return user
    def save_user(self, request, sociallogin, form=None):
        user = super(KaKaoAccountAdapter, self).save_user(request, sociallogin, form)
        print( "dir(sociallogin) :", dir(sociallogin) )
        print("dir(sociallogin.account) :", dir(sociallogin.account))
        return user


    def pre_social_login(self, request, sociallogin):

        # # This is tested and should work
        # try:
        #     user = User.objects.get(email=sociallogin.account.user.email)
        #     sociallogin.connect(request, user)
        #     # Create a response object
        #     response = HttpResponse()
        #     raise ImmediateHttpResponse(response)
        # except Exception:
        #     pass

        # print("pre_social_login: ", self, request, sociallogin)
        if sociallogin.user.id:
            print(sociallogin.token)
            return
        else:
            print('user.id 없음')
            return

        if request.user and request.user.is_authenticated:
            try:
                print('try!')
                login_user = User.objects.get(email=request.user)
                sociallogin.connect(request, login_user)
            except User.DoesNotExist:
                print('except!')
                pass

    # def save_user(self, request, sociallogin, form=None):
    #     # serializer = UserResigerBaseSerializer(data=request.POST)
    #     # serializer.is_valid()
    #     #
    #     print('save_user!')
    #     user = super().save_user(request, sociallogin, form)
    #     return user

    # def social_account_added(request, sociallogin):
    #     print("social_account_added", request, sociallogin)
    #     return HttpResponse('Fail')
    # def pre_social_login(self, request, sociallogin):
    #     user = sociallogin.user
    #     if user.id:
    #         return
    #     try:

from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings

class InvitationsCustomAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request):
        if hasattr(request, 'session') and request.session.get(
                'account_verified_email'):
            return True
        elif settings.INVITATION_ONLY is True:
            # Site is ONLY open for invites
            return False
        else:
            # Site is open to signup
            return True

    def get_user_signed_up_signal(self):
        return user_signed_up

    def send_mail(self, template_prefix, email, context):
        print('send_mail context:', context)
        try:
            context['activate_url'] = settings.URL_FRONT + 'accounts/confirm-email/' + context['key']
        except Exception as e:
            print('exception:', e)
            context['activate_url'] = 'https://chaema.co.kr/accounts/confirm-email/' + context['key']
        print('activate_url : ', context['activate_url'])
        print(template_prefix, email, context)
        msg = self.render_mail(template_prefix, email, context)
        print('msg:', msg)
        try:
            msg.send()
        except Exception as e:
            print('send error:', e)

    def get_login_redirect_url(self, request):
        print('redirect request', request)
        path = "/"
        return path
