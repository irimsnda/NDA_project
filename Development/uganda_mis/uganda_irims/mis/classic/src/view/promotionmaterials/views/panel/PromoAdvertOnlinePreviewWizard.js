/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.promotionmaterials.views.panels.PromoAdvertOnlinePreviewWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.promoadvertonlinepreviewwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    height: 600,
    //bodyPadding: 3,
    flex: 1,
    controller: 'promotionmaterialviewcontroller',
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    viewModel: {
        type: 'productregistrationvm'
    },
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 40,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:11px"
            },
            items: ['->', {
                xtype: 'tbspacer',
                width: 20
            },{
                xtype: 'displayfield',
                name: 'process_name',
                value: '****',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }

            },  {
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                                             'font-size': '12px',                     'margin-top': '-2px'
                    }
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                                             'font-size': '12px',                     'margin-top': '-2px'
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
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'status_type_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'is_manager_query'
                }, {
                    xtype: 'hiddenfield',
                    name: 'last_query_ref_id'
                }]
        }
    ],
    items: [
        {
            xtype: 'tabpanel',
            //layout: 'fit',
            defaults: {
                margin: 3
            },
            items: [{
                xtype: 'promotionalapplicantdetailsfrm',
                title: 'APPLICANT DETAILS'
            }]
        },
        {
            xtype: 'onlinepromotionaldetailspnl',
            dockedItems: [
                {
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
                            readOnly: true,
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
            items: [{
                xtype: 'onlineproductdocuploadsgrid',
                title: 'Product Application Documents Submission'
            }]
        },
        {
            xtype: 'onlineappinvoicepaymentspanel'
           
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
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'Applicant & Local Agent Details',
                    action: 'quickNav',
                    wizard: 'promoadvertonlinepreviewwizard',
                    handler: 'quickNavigationonlineprev'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Promotional Application Details',
                    action: 'quickNav', 
                    wizard: 'promoadvertonlinepreviewwizard',
                    handler: 'quickNavigationonlineprev'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: ' Application Documents Submission',
                    action: 'quickNav', 
                    wizard: 'promoadvertonlinepreviewwizard',
                    handler: 'quickNavigationonlineprev'
                },{
                    step: 3,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Invoice',
                    action: 'quickNav',
                    wizard: 'promoadvertonlinepreviewwizard',
                    handler: 'quickNavigationonlineprev',
                    bind:{
                        text:'{prechecking_querytitle}'
                    }
                }
            ]
        };
       
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    }, wizard: 'promoadvertonlinepreviewwizard',
                    handler: 'onPrevCardClickOnline'
                },
                 {
                    text: 'Update Product Application',
                    ui: 'soft-green',
                    iconCls: 'fa  fa-thumbs-up',
                    winWidth: '50%', hidden: true,
                    storeID: 'onlineproductregistrationstr',
                    winWidth: '50%',
                    wizard: 'promoadvertonlinepreviewwizard',
                    name: 'save_productapplications',
                }, '->',{
                    text: 'Save Pre-Checking Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    hidden: true,
                },{
                    text: 'Submit Application',
                    ui: 'soft-green',
                    iconCls: 'fa  fa-thumbs-up',
                    winWidth: '50%',
                    hidden: true,
                    is_invoicecheck: false,
                    storeID: 'onlineproductregistrationstr',
                    winWidth: '50%',
                    name: 'submit_btn',
                    
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
                    wizard: 'promoadvertonlinepreviewwizard',
                    handler: 'onNextCardClickOnline'
                }
            ]
        },
        me.callParent(arguments);
    }
});
