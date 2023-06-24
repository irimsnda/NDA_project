/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.PmsProgramDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmsprogramdetailspnl',
    height: Ext.Element.getViewportHeight() - 225,
    margin: 2,
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            xtype: 'pmsprogramdetailsfrm',
           // height:260,
            collapsible: true,
			 region:'west',
			width: 650,
            
        },
        
        {
            layout: {
                type: 'accordion'
            },
            title:'PMS Products & Region',
            //collapsible: true,
           
			region: 'center',
            items:[
                {
                    xtype: 'pmsprogramproductsgrid',
                    title: 'Products',
                    flex: 1, ui: 'soft-purple',
                    margin: 2
                },
                {
                    xtype: 'pmsprogramregionsgrid',
                    title: 'Regions',
                    flex: 1,
                    margin: 2
                },
                {
                    xtype: 'pmsprogramsamplingsitesgrid',
                    title: 'Program Sampling Sites',
                    flex: 1,
                    margin: 2
                }
            ]
        }
    ]
});