/**
 * Created by Kip on 11/10/2018.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.GCPInspectionProcessWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gcpinspectionprocesswizard',
    controller: 'clinicaltrialvctr', viewModel: 'clinicaltrialvm',
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
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [{
            xtype: 'premregappdocuploadsgenericgrid'

        }, {
            xtype: 'applicationunstructuredqueriesgrid',
            tbar: [{
                xtype: 'button',
                text: 'Add Query',
                iconCls: 'x-fa fa-plus',
                ui: 'soft-green',
                name: 'add_query',
                handler: 'showWinAddApplicationUnstrcuturedQueryForm',
                stores: '[]',
                bind: {
                    hidden: '{isReadOnly}'
                }
            }, {
                xtype: 'exportbtn'
            }, {
                xtype: 'hiddenfield',
                name: 'application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_id'
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
                name: 'item_resp_id'
            }, {
                xtype: 'hiddenfield',
                name: 'is_manager_query'
            }, {
                xtype: 'hiddenfield',
                name: 'is_manager_query_response'
            }, {
                xtype: 'hiddenfield',
                name: 'workflow_stage_id'
            }, {
                xtype: 'hiddenfield',
                name: 'isReadOnly'
            }, '->', {
                xtype: 'displayfield',
                name: 'tracking_no',
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'tbspacer',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'reference_no',
                fieldLabel: 'Ref No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }],
        },{
            xtype: 'gcpinspectionrecommendationfrm'
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
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'Inspection Reports',
                    action: 'quickNav',
                    handler: 'quickInspectionNavigationMoreDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Non-conformances Observations',
                    action: 'quickNav',
                    handler: 'quickInspectionNavigationMoreDetails'
                }, {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Inspection Details & Recommendation',
                    action: 'quickNav',
                    handler: 'quickInspectionNavigationMoreDetails'
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
                    handler: 'onPrevInspectionCardClickMoreDetails'
                },
                '->',
                {
                    text: 'Update Application Details',
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
                    handler: 'onNextInspectionCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
