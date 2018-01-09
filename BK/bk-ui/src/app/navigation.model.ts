export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'portal',
                'title'   : 'Portal',
                'type'    : 'collapse',
                'icon'    : '',
                'children': [
                    {
                        'id'   : 'origin',
                        'title': 'Origin',
                        'type' : 'item',
                        'url'  : '/pages/auth/login'
                    },                                                  
                    {
                        'id'   : 'nukh',
                        'title': 'Nukh',
                        'type' : 'item',
                        'url'  : '/pages/auth/mail-confirm'
                    },
                    {
                        'id'   : 'gotras',
                        'title': 'Gotra',
                        'type' : 'item',
                        'url'  : '/pages/auth/mail-confirm'
                    },
                    {
                        'id'   : 'temples',
                        'title': 'Temples',
                        'type' : 'item',
                        'url'  : '/pages/auth/mail-confirm'
                    },
                    {
                        'id'   : 'hostels',
                        'title': 'Hostels',
                        'type' : 'item',
                        'url'  : '/pages/auth/mail-confirm'
                    },
                    {
                        'id'   : 'organizations',
                        'title': 'Organizations',
                        'type' : 'item',
                        'url'  : '/pages/auth/mail-confirm'
                    }                    
                ]
            },
            {
                'id'      : 'directory',
                'title'   : 'Directory',
                'type'    : 'collapse',
                'icon'    : '',
                'children': [
                    {
                        'id'   : 'searchDirectory',
                        'title': 'Search Directory',
                        'type' : 'item',
                        'url'  : '/pages/auth/login'
                    },                                                  
                    {
                        'id'   : 'myAccount',
                        'title': 'My Family',
                        'type' : 'item',
                        'url'  : '/pages/auth/mail-confirm'
                    }                   
                ]
            },
            {
                'id'      : 'matrimony',
                'title'   : 'Matrimony',
                'type'    : 'collapse',
                'icon'    : '',
                'children': [
                    {
                        'id'   : 'searchMatrimony',
                        'title': 'Search Matrimony',
                        'type' : 'item',
                        'url'  : '/pages/auth/login'
                    },                                                  
                    {
                        'id'   : 'myProfile',
                        'title': 'My Profile',
                        'type' : 'item',
                        'url'  : '/pages/auth/mail-confirm'
                    }                   
                ]
            }
        ];
    }
}

