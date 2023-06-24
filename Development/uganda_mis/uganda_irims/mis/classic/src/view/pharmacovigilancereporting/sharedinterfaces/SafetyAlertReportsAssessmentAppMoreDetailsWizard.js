/**
 * Created by Kip on 1/28/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.sharedinterfaces.SafetyAlertReportsAssessmentAppMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.safetyalertreportsassessmentappmoredetailswizard',
    itemId: 'safetyalertreportsassessmentappmoredetailswizard',
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
            xtype: 'safetyalertreportsdetailspnl'
        },
        {
            xtype: 'clinicaltrialdocuploadsgenericgrid'
        },{
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
                    iconAlign: 'top',
                    text: 'Safety Alert Details',
                    action: 'quickNav',
                    wizard:'safetyalertreportsassessmentappmoredetailswizard',max_step:1,
                    handler: 'quickNavigationMoreDetails'
                },{
                    step: 1,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'Safety Alert Details Documents',
                    iconAlign: 'top',
                    action: 'quickNav',wizard:'safetyalertreportsassessmentappmoredetailswizard',max_step:1,
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
                    name: 'prev_btn',wizard:'safetyalertreportsassessmentappmoredetailswizard',max_step:1,
                    handler: 'onPrevCardClickMoreDetails'
                },
                '->',{
                    name:'save_btn',
                    hidden: true
                },
                {
                    text: 'Save Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    wizard: 'safetyalertreportsassessmentappmoredetailswizard',
                    toaster: 1,
                   
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
                    name: 'next_btn',wizard:'safetyalertreportsassessmentappmoredetailswizard',max_step:1,
                    handler: 'onNextCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
