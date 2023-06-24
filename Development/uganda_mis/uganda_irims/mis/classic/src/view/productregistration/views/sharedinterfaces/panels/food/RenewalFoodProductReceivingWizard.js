/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.food.RenewalFoodProductReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.renewalfoodproductreceivingWizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
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
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                },{
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },  {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
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
        xtype: 'foodproductsdetailspnl',
        dockedItems: [
            {
                xtype: 'toolbar',
                ui: 'footer',
                dock: 'top',
                margin: 3,
                items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-link',
                        childXtype: 'registeredproductsgrid',
                        text:'Search Product Application Details',
                        winTitle: 'Registered Products',
                        winWidth: '89%',
                        ui:'soft-green',
                        handlerFn: 'loadSelectedProduct',
                        handler: 'showregisteredProductsSearch'
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
        xtype: 'productscreeninggrid',
        title: 'Prechecking'
    },{
        xtype: 'appinvoicepaymentspanel'
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
                enableToggle: true,  pressed: true,
                text: 'Products Details',
                iconAlign: 'top',
                action: 'quickNav', wizard: 'renewalfoodproductreceivingWizard',
                handler: 'quickNavigationRenewal'
            },
            {
                step: 1,
                iconCls: 'fa fa-user',
                enableToggle: true,
              
                text: 'Applicant & Local Agent Details',
                action: 'quickNav',
                iconAlign: 'top',
                wizard: 'renewalfoodproductreceivingWizard',
                handler: 'quickNavigationRenewal'
            },
            {
                step: 2,
                iconCls: 'fa fa-upload',
                enableToggle: true,
                text: 'Product Application Documents Submission',
                action: 'quickNav',
                iconAlign: 'top',
                wizard: 'renewalfoodproductreceivingWizard',
                handler: 'quickNavigationRenewal'
            }, {
                step: 3,
                iconCls: 'fa fa-edit',
                enableToggle: true,iconAlign: 'top',
                text: "Products's Details Prechecking",
                iconAlign: 'top',
                action: 'quickNav', wizard: 'renewalfoodproductreceivingWizard',
                handler: 'quickNavigationRenewal'
            },{
                step: 4,
                iconCls: 'fa fa-money',
                enableToggle: true,
                text: 'Invoice & Payment Details',
                action: 'quickNav',iconAlign: 'top',
                wizard: 'renewalfoodproductreceivingWizard',
                handler: 'quickNavigationRenewal',
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
                    wizard: 'renewalfoodproductreceivingWizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    wizardpnl: 'renewalfoodproductreceivingWizard',
                    action_url: 'saveRenAltProductReceivingBaseDetails',
                    handler: 'saveProductReceivingBaseDetails'
                },{
                    text: ' Pre-Checking Recommendation',
                    ui: 'soft-red',
                    iconCls: 'fa fa-save', disabled: true, 
                    name: 'prechecking_recommendation',
                    
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
                    wizard: 'renewalfoodproductreceivingWizard',
                    handler: 'onNextCardClick'
                },{
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'productregistrationstr',
                    table_name: 'tra_product_applications',
                    winWidth: '50%',
                    handler: 'showReceivingApplicationSubmissionWin',
                    hidden: true
                }
            ]
        };
        me.callParent(arguments);
    }
});
