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
                'type'    : 'item',
                'url'     : 'directory',
                'icon'    : 'local_library',                
            },
            {
                'id'      : 'matrimony',
                'title'   : 'Matrimony',
                'type'    : 'item',
                'url'     : 'matrimony-search',
                'icon'    : 'wc',    
            },
            {
                'id'      : 'aboutus',
                'title'   : 'About Us',
                'type'    : 'item',
                'url'     : 'aboutus',
                'icon'    : 'group_work',    
            }
        ];
    }
}

