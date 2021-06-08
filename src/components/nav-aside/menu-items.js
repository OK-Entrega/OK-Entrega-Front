const companyId = localStorage.getItem("companyId");

export const navigation = {
    items: [
        {
            id: 'company',
            title: 'Empresarial',
            type: 'group',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: `/my-companies/${companyId}/dashboard`,
                    icon: 'feather icon-bar-chart-2',
                },
                {
                    id: 'shippers',
                    title: 'Embarcadores',
                    type: 'item',
                    url: `/my-companies/${companyId}/shippers`,
                    icon: 'feather icon-user',
                }
            ]
        },
        {
            id: 'orders',
            title: 'Entregas',
            type: 'group',
            children: [
                {
                    id: 'orders',
                    title: 'Entregas',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'news',
                            title: 'Pendentes',
                            type: 'item',
                            url: `/my-companies/${companyId}/orders/pending`
                        },
                        {
                            id: 'history',
                            title: 'Histórico',
                            type: 'item',
                            url: `/my-companies/${companyId}/orders/history`
                        }
                    ]
                }
            ]
        },
        {
            id: 'field',
            title: 'Campo',
            type: 'group',
            children: [
                {
                    id: 'charts',
                    title: 'Registros',
                    type: 'item',
                    icon: 'feather icon-pie-chart',
                    url: `/my-companies/${companyId}/records`
                },
                {
                    id: 'maps',
                    title: 'Georeferenciamento de registros',
                    type: 'item',
                    icon: 'feather icon-map',
                    url: `/my-companies/${companyId}/georeferencing-of-records`
                }
            ]
        }
    ]
}