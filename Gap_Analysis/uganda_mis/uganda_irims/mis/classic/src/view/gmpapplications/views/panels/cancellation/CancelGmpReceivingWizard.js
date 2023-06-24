/**
 * Created by Kip on 5/21/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.cancellation.CancelGmpReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cancelgmpreceivingwizard',
    viewModel: 'gmpapplicationsvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
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
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: false,
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
                            var pnl = cmbo.up('cancelgmpreceivingwizard'),
                                ltr_selection = pnl.down('combo[name=applicant_as_ltr]');
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
                    name: 'assessment_type_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: false,
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
            xtype: 'mansitedetailstabpnl'//'applicationmansitepnl'
        },
        {
            xtype: 'applicantdetailsfrm'
        },
        {
            xtype: 'productlinedetailsgrid'
        },
        {
            xtype: 'gmpproductslinkagedetailsgrid'
        },
        {
            xtype: 'gmpappdocuploadsgenericgrid'
        },
        {
            xtype: 'gmpwithdrawalreasonsgrid'
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
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    pressed: true,
                    text: 'MANUFACTURING SITE DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    name: 'line_details',
                    text: 'PRODUCT LINE DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-cubes',
                    enableToggle: true,
                    text: 'PRODUCT DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-close',
                    enableToggle: true,
                    text: 'WITHDRAWAL REASONS',
                    action: 'quickNav'
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
                    },
                    name: 'prev_btn'
                },
                {
                    xtype: 'transitionsbtn'
                },
                {
                    xtype: 'applicationdismissalbtn'
                },
                {
                    text: 'Queries/Responses',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-gavel',
                    name: 'queries_responses',
                    hidden: true
                },
                '->',
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1
                },
                {
                    text: 'Save Screening Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    hidden: true
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_gmp_applications',
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
                    name: 'next_btn'
                }
            ]
        };
        me.callParent(arguments);
    }
});

