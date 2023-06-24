/**
 * Created by Kip on 5/24/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.ManSiteAppMoreDetailsAltWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mansiteappmoredetailsaltwizard',
    controller: 'gmpapplicationsvctr',
    viewModel: 'gmpapplicationsvm',
    name: 'wizardPanel',
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
                            } else {
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
            xtype: 'mansitedetailswintabpnl'
        },
        {
            xtype: 'applicationapplicantpnl'
        },
        {
            xtype: 'productlinedetailswingrid'
        },
        {
            xtype: 'gmpproductslinkagedetailswingrid'
        },
        {
            xtype: 'gmpvariationrequestsgrid'
        },
        {
            xtype: 'gmpappprevdocuploadsgenericgrid'
        },
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'gmp_type_id'
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
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetailsAlt'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetailsAlt'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: 'PRODUCT LINES DETAILS',
                    name: 'line_details',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetailsAlt'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-cubes',
                    enableToggle: true,
                    text: 'PRODUCT DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetailsAlt'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'VARIATION REQUEST',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetailsAlt'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetailsAlt'
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
                    handler: 'onPrevCardClickMoreDetailsAlt'
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
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    handler: 'onNextCardClickMoreDetailsAlt'
                }
            ]
        };
        me.callParent(arguments);
    }
});
