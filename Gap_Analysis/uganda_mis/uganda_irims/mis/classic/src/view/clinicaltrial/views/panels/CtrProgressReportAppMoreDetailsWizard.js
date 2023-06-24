/**
 * Created by Kip on 1/28/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.CtrProgressReportAppMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ctrprogressreportappmoredetailswizard',
    itemId: 'ctrprogressreportappmoredetailswizard', 
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
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

    items: [
        {
            xtype: 'clinicaltrialapplicantpnl'
        },
        {
            xtype: 'clinicaltrialsprogressrptdetailspnl'
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
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav',wizard:'ctrprogressreportappmoredetailswizard',max_step:1,
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: 'CLINICAL TRIAL DETAILS',
                    action: 'quickNav',wizard:'ctrprogressreportappmoredetailswizard',max_step:1,
                    handler: 'quickNavigationMoreDetails'
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
                    name: 'prev_btn',wizard:'ctrprogressreportappmoredetailswizard',max_step:1,
                    handler: 'onPrevCardClickMoreDetails'
                },
                '->',
                {
                    text: 'Save Clinical Trial Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_clinicaltrial_details_btn',
                    toaster: 1,
                    bind: {
                        disabled: '{!atDetails}'
                    }
                },
                {
                    text: 'Save Other Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_other_details_btn',
                    toaster: 1,
                    hidden: true,
                    bind: {
                        disabled: '{!atOtherDetails}'
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
                    name: 'next_btn',wizard:'ctrprogressreportappmoredetailswizard',max_step:1,
                    handler: 'onNextCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
