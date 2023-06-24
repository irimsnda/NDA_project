
/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.panels.DisposalApplicationsWizardPreview', {
	extend: 'Ext.tab.Panel',
    alias: 'widget.disposalapplicationswizardpreview',
    
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
   
    height: 600,
    flex: 1,
    controller: 'disposalpermitsvctr',
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    viewModel: {
        type: 'disposalpermitsvm'
    },
   
    items: [
        {
            xtype: 'panel',
            autoScroll: true,
            title:'Disposal Applications Details',
            dockedItems: [{
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'top',
                    margin: 3,
                    items: [
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
            }],
            items:[{
                xtype: 'disposalapplicantdetailsfrm',
                title: 'APPLICANT DETAILS'
            },{
                xtype: 'disposalpermitsdetailspnl',//onlinefoodproductsdetailspnl
                
            }]
        }
    ],
    bbar:['->', {
        text: 'Update Application Details',
        ui: 'soft-purple',
        iconCls: 'fa fa-save',
        name: 'save_btn',
        disabled: false,
        action_url: 'saveDisposalApplicationDetails',
        wizardpnl: 'disposalapplicationswizard',
        handler: 'saveDisposaltReceivingBaseDetails'
    }]
});
