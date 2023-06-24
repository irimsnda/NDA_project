/**
 * Created by Kip on 6/25/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.PmsAppMoreDetailsWizardUnstructured', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pmsappmoredetailswizardunstructured',
    controller: 'surveillancevctr',
    viewModel: 'surveillancevm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    flex: 1,
    scrollable: true,
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
                columnWidth: 0.5,
                margin: 5,
                labelAlign: 'top'
            },
            bodyPadding: 5,
            items:[
                {
                    xtype: 'combo',
                    fieldLabel: 'Zone',
                    labelWidth: 50,
                    width: 400,
                    name: 'zone_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: false,
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
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Directorate',
                    labelWidth: 85,
                    width: 400,
                    allowBlank: false,
                    name: 'directorate_id',
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
                                        model_name: 'Directorate'
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
            xtype: 'samplecollectionsitefrm'
        },
        {
            xtype: 'sampledetailswingrid'
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
                    pressed: true,
                    enableToggle: true,
                    text: 'SAMPLE COLLECTION SITE',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetailsUnstructured'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'SAMPLE/PRODUCT DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetailsUnstructured'
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
                    name: 'prev_btn',
                    handler: 'onPrevCardClickMoreDetailsUnstructured'
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
                    name: 'next_btn',
                    handler: 'onNextCardClickMoreDetailsUnstructured'
                }
            ]
        };
        me.callParent(arguments);
    }
});
