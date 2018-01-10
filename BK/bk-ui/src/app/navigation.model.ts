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
                        'url'  : 'origin'
                    },                                                  
                    {
                        'id'   : 'nukh',
                        'title': 'Nukh',
                        'type' : 'item',
                        'url'  : 'nukhs'
                    },
                    {
                        'id'   : 'gotras',
                        'title': 'Gotra',
                        'type' : 'item',
                        'url'  : 'gotras'
                    },
                    {
                        'id'   : 'temples',
                        'title': 'Temples',
                        'type' : 'item',
                        'url'  : 'temples'
                    },
                    {
                        'id'   : 'hostels',
                        'title': 'Hostels',
                        'type' : 'item',
                        'url'  : 'hostels'
                    },
                    {
                        'id'   : 'organizations',
                        'title': 'Organizations',
                        'type' : 'item',
                        'url'  : 'organizations'
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
                        'id'   : 'searchProfile',
                        'title': 'Search Profile',
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

