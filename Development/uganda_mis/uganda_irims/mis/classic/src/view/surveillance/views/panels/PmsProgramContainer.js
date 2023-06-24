/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.PmsProgramContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmsprogramcontainer',
    items: [
        {
            xtype: 'tabpanel',
            ui: 'navigation',
            tabBar: {
                layout: {
                    pack: 'center'
                },
                border: false
            },
            defaults: {
                iconAlign: 'top'
            },
			layout:'fit',
            items: [
                {
                    xtype: 'pmsprogramdetailspnl',
                    title: 'Program Details'
                },{
                    title: 'Annual PMS Plan Implementation',
					layout:'fit',
					xtype:'panel',
					itemId:'pmsprogramimplpanel',
					layout:'fit',
					items:[{
						 xtype:'pmsprogramimplementationgrid',
					}]
                }/*,{
                    title: 'Annual PMS Program Implementation',
                    xtype:'pmsprogramplansgrid',
                    
                }*/
            ]
        }
    ]
});