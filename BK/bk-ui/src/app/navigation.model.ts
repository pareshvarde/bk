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
                'icon'    : 'public',
                'children': [
                    {
                        'id'   : 'home',
                        'title': 'Home',
                        'type' : 'item',
                        'url'  : 'home',
                        'icon': 'home'
                    }, 
                    {
                        'id'   : 'origin',
                        'title': 'Origin',
                        'type' : 'item',
                        'url'  : 'origin',
                        'icon' : 'history'
                    },                                                  
                    {
                        'id'   : 'nukh',
                        'title': 'Nukh',
                        'type' : 'item',
                        'url'  : 'nukhs',
                        'icon': 'movie'
                    },
                    {
                        'id'   : 'gotras',
                        'title': 'Gotra',
                        'type' : 'item',
                        'url'  : 'gotras',
                        'icon' : 'movie_filter'
                    },
                    {
                        'id'   : 'temples',
                        'title': 'Temples',
                        'type' : 'item',
                        'url'  : 'temples',
                        'icon' : 'local_activity'
                    },
                    {
                        'id'   : 'hostels',
                        'title': 'Hostels',
                        'type' : 'item',
                        'url'  : 'hostels',
                        'icon' : 'school'
                    },
                    {
                        'id'   : 'organizations',
                        'title': 'Organizations',
                        'type' : 'item',
                        'url'  : 'organizations',
                        'icon' : 'business'
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
                        'url'  : 'family'
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

