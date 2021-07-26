from allauth.account.signals import user_signed_up
from django.dispatch import receiver

from invitations.utils import get_invitation_model

@receiver(user_signed_up)
def user_signed_up(request, user, **kwargs):
    try:
        Invitation = get_invitation_model()
        invite = Invitation.objects.get(email=user.email)
    except Invitation.DoesNotExist:
        print("this was probably not an invited user.")
    else:
        print('invite:', invite)
        # user.company = invite.inviter.company
        # user.save()
