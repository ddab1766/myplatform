from rest_framework.routers import Route, DynamicRoute, SimpleRouter


class CustomReadOnlyRouter(SimpleRouter):
    """
    A router for read-only APIs, which doesn't use trailing slashes.
    """
    routes = [
        Route(
            url=r'^{prefix}$',
            mapping={'get': 'list'},
            name='{basename}-list',
            detail=False,
            initkwargs={'suffix': 'List'}
        ),
        Route(
            url=r'^{prefix}/{lookup}$',
            mapping={'get': 'retrieve'},
            name='{basename}-detail',
            detail=True,
            initkwargs={'suffix': 'Detail'}
        ),
        DynamicRoute(
            url=r'^{prefix}/{lookup}/{url_path}$',
            name='{basename}-{url_name}',
            detail=True,
            initkwargs={}
        )
    ]



# class MultiDBRouter(object):
#     def __init__(self):
#         self.model_list = ['default', 'erp']
#
#     def db_for_read(self, model, **hints):
#         if model._meta.app_label in self.model_list:
#             return model._meta.app_label
#
#         return None
#
#     def db_for_write(self, model, **hints):
#         if model._meta.app_label in self.model_list:
#             print('db_for_write: %s' % model._meta.app_label)
#             return model._meta.app_label
#
#         return None
#
#     def allow_relation(self, obj1, obj2, **hints):
#         if obj1._meta.app_label in self.model_list or \
#                 obj2._meta.app_label in self.model_list:
#             return True
#
#         return None
#
#     def allow_migrate(self, db, app_label, model_name=None, **hints):
#         if app_label == 'erp':
#             return db in self.model_list
#         elif db == 'default':
#             return True
#         # return True
#
#         return None
#     # def db_for_read(self, model, **hints):
#     #     print('self: ',self)
#     #     print('model._meta.app_label:', model._meta.app_label)
#     #     return 'chaegongERP' if model._meta.app_label == 'default' else 'default'
#     #
#     # def db_for_write(self, model, **hints):
#     #     return 'chaegongERP' if model._meta.app_label == 'default' else 'default'
#     #
#     # def allow_relation(self, obj1, obj2, **hints):
#     #     return True
#     #
#     # def allow_migrate(self, db, app_label, model_name=None, **hints):
#     #     return app_label != 'default'