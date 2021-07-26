import django_filters
import datetime


class EndFilter(django_filters.DateFilter):

    def filter(self, qs, value):
        if value:
            value = value + datetime.timedelta(days=1)
        return super(EndFilter, self).filter(qs, value)