
Ext.define('Admin.view.drugshopregistration.views.panels.DrugShopOtherDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'drugshopotherdetailstabPnl',
    margin: 3,
    items: [
       
        {
            title: 'PROPRIETOR(S)/DIRECTORS(S)',
            xtype: 'premisepersonneldetailsgrid'
        },
        {
            title: 'Nearest Pharmacies',
            xtype: 'nearestpremisegrid'
        },
         {
            title: 'Other License(S)',
            xtype: 'drugshopotherlicensesdetailsgrid'
        }

    ]
});