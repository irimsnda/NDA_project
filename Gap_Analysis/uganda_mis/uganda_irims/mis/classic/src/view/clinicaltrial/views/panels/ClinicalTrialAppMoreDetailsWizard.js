/**
 * Created by Kip on 1/28/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialAppMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.clinicaltrialappmoredetailswizard',
    itemId: 'clinicaltrialappmoredetailswizard',
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
            xtype: 'clinicaltrialsdetailspnl'
        },
        {
            xtype: 'clinicaltrialstudysitesgrid'
        },
        {
           xtype: 'tabpanel',
            title:'Clinical Trial Investigator(s) & Monitor(s)',
            items:[{
                xtype: 'clinicaltrialotherinvestigatorsgrid',
                title:'Clinical Trial Other Investigator(s)'
            },{
                xtype: 'clinicaltrialmonitorsgrid',
                title: 'Clinical Trial Monitor(s)'
            }]
        },
        
        {
            
            xtype: 'tabpanel',
            title:'Clinical Trial Products',
            layout: 'accordion',
            items:[{
                xtype: 'impproductsgrid',
                title:'Clinical Trial Investigational Products'
            },{
                xtype: 'clinicalcomparatorproductsgrid',
                title:'Clinical Trial Comparator Products'
            }]
        },{
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
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav',
                    wizard:'clinicaltrialappmoredetailswizard',max_step:5,
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: 'CLINICAL TRIAL DETAILS',
                    action: 'quickNav',
                    wizard:'clinicaltrialappmoredetailswizard',max_step:5,
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'STUDY SITES',
                    action: 'quickNav',wizard:'clinicaltrialappmoredetailswizard',max_step:5,
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-plus-square',
                    enableToggle: true,
                    text: 'OTHER INVESTIGATORS',
                    action: 'quickNav',wizard:'clinicaltrialappmoredetailswizard',max_step:5,
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'IMP PRODUCTS',
                    action: 'quickNav',wizard:'clinicaltrialappmoredetailswizard',max_step:5,
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'DOCUMENTS',
                    action: 'quickNav',wizard:'clinicaltrialappmoredetailswizard',max_step:5,
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
                    name: 'prev_btn',wizard:'clinicaltrialappmoredetailswizard',max_step:5,
                    handler: 'onPrevCardClickMoreDetails'
                },
                '->',{
                    name:'save_btn',
                    hidden: true,
                    disabled:true
                },
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
                    name: 'next_btn',wizard:'clinicaltrialappmoredetailswizard',max_step:5,
                    handler: 'onNextCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
