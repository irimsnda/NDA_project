
/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.panels.DisposalPermitVerificationWizard', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.disposalpermitverificationwizard',
    
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',

    layout: 'card',
    
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
            xtype: 'tabpanel',
            items: [{
              xtype:'disposalapplicationswizardpreview',
              title: 'Disposal Application Request'
            },{
                xtype: 'disposaldestructionfrm',
                title: 'Date & Location & Method(s) Of Destruction'
            },{
                xtype: 'disposaldestsupervisorsgrid',
                title: 'Supervisor(s)',
                listeners: {
                    afterrender: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    }
                },
                tbar: [
                    {
                        xtype: 'hiddenfield',
                        name: 'isReadOnly'
                    },
                    {
                        xtype: 'button',
                        text: 'Add Internal Supervisor',
                        name: 'addsupervisor',
                        iconCls: 'x-fa fa-plus',
                        ui: 'soft-green',
                        handler: 'showAddDisposalSupervisors',
                        childXtype: 'pardisposalinternalsupervisorsfrm',
                        winTitle: 'Disposal Supervisor',
                        winWidth: '30%',
                        stores: '[]'
                    },{
                        xtype: 'button',
                        text: 'Add External Supervisor',
                        name: 'addsupervisor',
                        iconCls: 'x-fa fa-plus',
                        ui: 'soft-green',
                        handler: 'showAddDisposalSupervisors',
                        childXtype: 'pardisposalexternalsupervisorsfrm',
                        winTitle: 'Disposal Supervisor',
                        winWidth: '30%',
                        stores: '[]'
                    }
                ],
            }]
        },{
                xtype: 'disposalverificationuploadsgrid',
                title: 'Documents Upload'
        },{
            xtype: 'disposalchecklistgrid',
           hidden: true,
            title: 'Disposal Verification Checklist'
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        }
    ],
    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            style: {
                "background-color": "#90c258"
            },
            bodyStyle: {
                "background-color": "#90c258"
            },
            layout: {
                pack: 'center'
            },
            items: [{
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Disposal Process Information',
                    action: 'quickNav', 
                    wizard: 'disposalpermitverificationwizard',
                    handler: 'quickNavigation'
                }, {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Disposal Verification Documents Submission',
                    action: 'quickNav',
                     wizard: 'disposalpermitverificationwizard',
                    handler: 'quickNavigation'
                }
            ]
        };
      
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [{
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    }, wizard: 'disposalpermitverificationwizard',
                    handler: 'onPrevCardClick'
                },{
                    text: 'Save/Update Verification Checklist',
                    ui: 'soft-blue',
                    hidden: true,
                    iconCls: 'fa fa-weixin',
                    name: 'save_evaluationchecklist'
                },{
                    text: 'Preview/Edit Disposal Application Details',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-edit',
                    hidden: true,
                    isReadOnly: 0, 
                    name: 'previewpermitsdetailsbtn',
                    winTitle: 'Products Details',
                    winWidth: '60%',
                     handler: 'productPreviewEditDisposalDetails',
                    stores: '[]'
                    
                },'->',
                {
                    text: 'Save Destruction Exercise  Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    action_url: 'saveDisposalDestructionDetails',
                    wizardpnl: 'disposalpermitverificationwizard',
                    handler: 'saveDisposalDestructionDetails'
                },{
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    storeID: 'disposalpermitsproductsstr',
                    table_name: 'tra_disposal_applications',
                    action: 'process_submission_btn',
                    name: 'process_submission_btn',
                    winWidth: '50%'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    wizard: 'disposalpermitverificationwizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
