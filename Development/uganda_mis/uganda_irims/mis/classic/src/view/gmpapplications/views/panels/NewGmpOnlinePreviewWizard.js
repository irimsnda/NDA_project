/**
 * Created by Kip on 1/9/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.NewGmpOnlinePreviewWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newgmponlinepreviewwizard',
    padding: '2 0 2 0',
    name: 'wizardPanel',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    dockedItems: [
        {
            name: 'applicationdetailsform',
            dock: 'top',
            frame: true,
            width: '100%',
            layout: 'column',
            defaults: {
                columnWidth: 0.25,
                margin: 5,
                labelAlign: 'top'
            },
            bodyPadding: 5,
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'GMP Type',
                    labelWidth: 120,
                    width: 400,
                    name: 'gmp_type_id',
                  //  readOnly: true,
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    labelStyle: 'font-weight:bold',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_gmplocation_details'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmbo, newVal) {
                            var win = cmbo.up('window'),
                                ltr_selection = win.down('combo[name=applicant_as_ltr]');
                            if (newVal == 2 || newVal === 2) {
                                ltr_selection.setValue(1);
                                ltr_selection.setReadOnly(true);
                            }else{
                                ltr_selection.setValue(2);
                                ltr_selection.setReadOnly(false);
                            }
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Device Type',
                    name: 'device_type_id',
                    forceSelection: true,
                    allowBlank: true,
                   // readOnly: true,
                    hidden: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_device_types'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Assessment Type',
                    labelWidth: 120,
                    width: 400,
                   //readOnly: true,
                    name: 'assessment_type_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    labelStyle: 'font-weight:bold',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_gmp_assessment_types'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'applicationapplicantpnl'
        },
        {
            xtype: 'onlinemansitedetailswintabpnl'
        },
        {
            xtype: 'onlineproductlinedetailsgrid'
        },
        {
            xtype: 'gmpproductslinkagedetailsonlinegrid'
        },
        {
            xtype: 'gmpapponlinedocuploadsgenericgrid'
        },
        {
            xtype: 'gmponlinescreeninggrid'
        }
    ],

    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
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
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnline'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'MANUFACTURING BUSINESS DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnline'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: 'PRODUCT LINES DETAILS',
                    action: 'quickNav',
                    name: 'line_details',
                    handler: 'quickNavigationOnline'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-cubes',
                    enableToggle: true,
                    text: 'PRODUCTS APPLIED FOR REGISTRATION',
                    action: 'quickNav',
                    handler: 'quickNavigationOnline'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnline'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'PRE-CHECKING',
                    action: 'quickNav',
                    handler: 'quickNavigationOnline'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            name: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    handler: 'onPrevCardClickOnline'
                },
                {
                    text: 'Preview Queries/Responses',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'x-fa fa-bars',
                    name: 'preview_queries_btn'
                },
                {
                    text: 'Action',
                    hidden: true,
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'action',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Accept and Save Application',
                                iconCls: 'x-fa fa-thumbs-o-up',
                                name: 'action_accept'
                            },
                            {
                                text: 'Reject and Return Application',
                                iconCls: 'x-fa fa-thumbs-o-down',
                                name: 'action_reject'
                            }
                        ]
                    }
                },
                {
                    text: 'Receive Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-up',
                    name: 'receive_btn',
                    //handler: 'receiveOnlineApplicationDetailsFrmBtn',
                    storeID: 'onlinepremregistrationstr',
                    hidden: true,
                    winWidth: '50%',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                
                {
                    text: 'Query Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-sliders',
                    name: 'query_btn',
                    hidden: true,
                    handler: 'queryOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                {
                    text: 'Reject Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-down',
                    name: 'reject_btn',
                    hidden: true,
                    handler: 'submitRejectedOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                '->',
                {
                    
                    text: 'Save Pre-Checking Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    disabled: true

                },{
                    text: 'Receive & Invoice Application',
                    ui: 'soft-purple',
                    iconCls: 'fa  fa-print',
                    winWidth: '50%',hidden: true,
                    disabled: true,
                    storeID: 'onlinegmpapplicationsstr',
                    winWidth: '30%',
                    name: 'receive_invoicebtn'
                }, {
                    text: 'Print Invoice',
                    ui: 'soft-purple',
                    name: 'print_invoice',
                    hidden: true,
                    iconCls: 'fa fa-print',
                    report_type: 'Invoice'
                },{
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-check',
                    name: 'submit_btn',is_invoicecheck:false,
                    //handler: 'receiveOnlineApplicationDetailsFrmBtn',
                    storeID: 'onlinepremregistrationstr',
                    winWidth: '50%',
                    bind: {
                        disabled: '{!atEnd}'
                    }
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
                    handler: 'onNextCardClickOnline'
                }
            ]
        };
        me.callParent(arguments);
    }
});
