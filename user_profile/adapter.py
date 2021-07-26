from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings


class MyAccountAdapter(DefaultAccountAdapter):
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

