/**
 * Created by Kip on 2/8/2019.
 */
Ext.define('Admin.view.commoninterfaces.ApplicationPremisePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationpremisepnl',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            hidden: true,
            dock: 'top',
            margin: 3,
            items:[
                {
                    xtype: 'tbspacer',
                    width: 2
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Zone',
                    labelWidth: 50,
                    width: 400,
                    name: 'zone_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        model_name: 'Zone'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    },
                    labelStyle: 'font-weight:bold'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'premisedetailstabpnl'
        }
    ]
});