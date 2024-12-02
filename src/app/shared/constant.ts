

export const breadcrumbsMenu=[
    {
        label:'Categories',
        path:'/categories',
        children:[
            {
                path:':category'
            },
            {
                path:'/product/:id'
            }
        ]
    }
];

export const MENU:{
    title:string;
    path:string;
}[]
=[
    {
        title:'Chocolate',
        path:'/categories/Chocolate'
    },
    {
        title:'Biscuits',
        path:'/categories/Biscuits'
    },
    {
        title:'Café',
        path:'/categories/Café'
    },
    {
        title:'Said ',
        path:'/categories/Said'
    },
    {
        title:'Beverages',
        path:'/categories/Beverages'
    },
    {
        title:'Electronics',
        path:'/categories/Electronics'
    }
]

