/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.panels.new.NewGmpReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newgmpreceivingwizard',
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
                            var pnl = cmbo.up('newgmpreceivingwizard'),
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
            xtype: 'applicationapplicantpnl'
        },
        {
            xtype: 'mansitedetailstabpnl'//'mansitedetailspanel'
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
            xtype: 'productscreeninggrid'
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
                    max_step: 6,iconAlign: 'top',
                    text: 'Applicant details',wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true, max_step: 6,iconAlign: 'top',
                    text: 'Manufacturing Site Details',wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,iconAlign: 'top',
                    name: 'line_details', max_step: 6,
                    text: 'Product Line Details',wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-cubes',
                    enableToggle: true, max_step: 6,iconAlign: 'top',
                    text: 'Product Registration Details',wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-upload',
                    enableToggle: true, max_step: 6,iconAlign: 'top',
                    text: 'Documents Upload',wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true, max_step: 6,iconAlign: 'top',
                    text: 'Prechecking',wizard_pnl : 'newgmpreceivingwizard',
                    action: 'quickNav'
                },
                {
                           step: 6,
                           iconCls: 'fa fa-money',
                           enableToggle: true,iconAlign:'top',
                           text: 'Invoice & Payment Details',max_step: 6,
                           wizard_pnl : 'newgmpreceivingwizard',
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
                    },wizard_pnl : 'newgmpreceivingwizard',max_step: 6,
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
                    },wizard_pnl : 'newgmpreceivingwizard',max_step: 6,
                    name: 'next_btn'
                }
            ]
        };
        me.callParent(arguments);
    }
});
