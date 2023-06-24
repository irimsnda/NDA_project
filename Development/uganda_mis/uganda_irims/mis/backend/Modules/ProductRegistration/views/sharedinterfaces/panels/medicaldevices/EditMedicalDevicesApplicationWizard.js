
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.medicaldevices.EditMedicalDevicesApplicationWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.editmedicaldevicesapplicationwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    itemId: 'editmedicaldevicesapplicationwizard',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },//drugproductdocuploadsgrid
            items: ['->', {
                    xtype: 'hiddenfield',
                    name: 'process_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'workflow_stage_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'status_type_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'is_manager_query'
                }
            ]
        }
    ],
    items: [{
        xtype: 'medicaldevicesProductsDetailsPnl',
        dockedItems: [
            {
                xtype: 'toolbar',
                ui: 'footer',
                dock: 'top',
                margin: 3,
                items: [{
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    childXtype: 'allproductsappgrid',
                    text:'Search Product Application Details',
                    winTitle: 'Registered Products',
                    winWidth: '70%',
                    ui:'soft-green',
                    handlerFn: 'loadSelectedProduct',
                    handler: 'showregisteredProductsSearch'
                },
                {
                    xtype:'tbfill'
                },
                    {
                        xtype: 'tbseparator',
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

    }, {
        xtype: 'tabpanel',
        //layout: 'fit',

        defaults: {
            margin: 3
        },
        items: [{
            xtype: 'productapplicantdetailsfrm',
            title: 'APPLICANT DETAILS'
        },
        {
            xtype: 'productlocalapplicantdetailsfrm',
            title: 'LOCAL AGENT DETAILS'
        }]
    }, {
        xtype: 'tabpanel',
        items: [{
            xtype: 'productDocUploadsGrid',
            title: 'Product Application Documents Submission'
        }]
    },
    {
        xtype: 'producteditvariationrequestsgrid'
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
                text: 'Products Details',
                action: 'quickNav', wizard: 'editmedicaldevicesapplicationwizard',
                handler: 'quickNavigationRenewal'
            },
            {
                step: 1,
                iconCls: 'fa fa-user',
                enableToggle: true,
                pressed: true,
                text: 'Applicant & Local Agent Details',
                action: 'quickNav',
                wizard: 'editmedicaldevicesapplicationwizard',
                handler: 'quickNavigationRenewal'
            },
            {
                step: 2,
                iconCls: 'fa fa-upload',
                enableToggle: true,
                text: 'Product Application Documents Submission',
                action: 'quickNav',
                wizard: 'editmedicaldevicesapplicationwizard',
                handler: 'quickNavigationRenewal'
            }, {
                step: 3,
                iconCls: 'fa fa-edit',
                enableToggle: true,
                text: "CLEANUP REQUEST",
                action: 'quickNav', wizard: 'editmedicaldevicesapplicationwizard',
                handler: 'quickNavigationRenewal'
            }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Back to List',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'back_to_list',
                    hidden: true
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard: 'editmedicaldevicesapplicationwizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save Eddited Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    wizardpnl: 'editmedicaldevicesapplicationwizard',
                    action_url: 'saveRenAltProductReceivingBaseDetails',
                    handler: 'saveMDProductEditionBaseDetails'
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
                    wizard: 'editmedicaldevicesapplicationwizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
