from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.template.loader import render_to_string
from django.template import TemplateDoesNotExist
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site


class SendMailView(APIView):

    def get(self, request):
        # print('SendMailView self:', self)
        # print('SendMailView request:', request)
        try:
            email_address = request.query_params['email']

            current_site = get_current_site(request)
            email_template = 'account/email/email_confirmation'
            email_address = email_address
            ctx = {
                "user": request.user,
                # "activate_url": activate_url,
                "current_site": current_site,
                # "key": emailconfirmation.key,
            }

            # self.send_mail(email_template, email_address, ctx)
        except KeyError:
            return Response({'phone': ['에러']}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # result = AuthSms.check_auth_number(p_num, a_num)
            return Response({'message': 'OK', 'result': 'result'})

    def get_from_email(self):
        """
        This is a hook that can be overridden to programatically
        set the 'from' email address for sending emails
        """
        return settings.DEFAULT_FROM_EMAIL

    def render_mail(self, template_prefix, email, context):
        """
        Renders an e-mail to `email`.  `template_prefix` identifies the
        e-mail that is to be sent, e.g. "account/email/email_confirmation"
        """
        subject = render_to_string('{0}_subject.txt'.format(template_prefix),
                                   context)
        # remove superfluous line breaks
        subject = " ".join(subject.splitlines()).strip()
        # subject = self.format_email_subject(subject)

        from_email = self.get_from_email()

        bodies = {}
        for ext in ['html', 'txt']:
            try:
                template_name = '{0}_message.{1}'.format(template_prefix, ext)
                bodies[ext] = render_to_string(template_name,
                                               context).strip()
            except TemplateDoesNotExist:
                if ext == 'txt' and not bodies:
                    # We need at least one body
                    raise
        if 'txt' in bodies:
            msg = EmailMultiAlternatives(subject,
                                         bodies['txt'],
                                         from_email,
                                         [email])
            if 'html' in bodies:
                msg.attach_alternative(bodies['html'], 'text/html')
        else:
            msg = EmailMessage(subject,
                               bodies['html'],
                               from_email,
                               [email])
            msg.content_subtype = 'html'  # Main content is now text/html
        return msg

    def send_mail(self, template_prefix, email, context):
        msg = self.render_mail(template_prefix, email, context)
        msg.send()