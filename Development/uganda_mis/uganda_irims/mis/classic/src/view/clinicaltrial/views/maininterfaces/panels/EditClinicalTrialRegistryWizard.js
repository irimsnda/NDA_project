
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.panels.EditClinicalTrialRegistryWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.editclinicaltrialregistrywizard',
    viewModel: 'clinicaltrialvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    itemId: 'editclinicaltrialreceivingwizardId',
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
    items: [{
            xtype: 'clinicaltrialapplicantpnl'
        },
        {
            xtype: 'clinicaltrialsregistrydetailspnl'
        },
        {
            xtype: 'ctrregistrysecondaryidsfrm'
        },{
            xtype: 'ctrregistrystudydesignfrm'
        },{
            xtype: 'ctrregistryinterventionsgrid'
        },
        {
            xtype: 'ctrregistryeligibilitycriteriafrm'
        },
        {
            xtype: 'ctrregistryoutcomesgrid'
        },{
            xtype: 'ctrregistryrecruitmentcentresgrid'
        },{
            xtype: 'ctrregistryethicsapprovalsgrid'
        },{
            xtype: 'ctrregistryfundingsourcefrm'
        },{
            xtype: 'ctrregistrycollaboratorssfrm'
        },
        {
                xtype:'tabpanel',
                layout:'fit',
                items:[{
                    xtype: 'ctrregistrysponsorsgrid',
                    title:'Clinical Trial Sponsors'
                },{
                    xtype: 'ctrregistrycontactpersonsgrid',
                    title:'Clinical Trial Contact Persons'
                },]
        },

        {
            xtype: 'clinicaltrialonlinedocuploadsgenericgrid'
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
                pack: 'left'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,iconAlign:'top',
                    text: 'APPLICANT ',
                    //action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,iconAlign:'top',
                    text: 'Clinical Trial Registry ',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,iconAlign:'top',
                    text: 'Secondary Id(s)',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-plus-square',
                    enableToggle: true,
                    text: 'Study Design ',iconAlign:'top',
                  //  action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'Interventions',iconAlign:'top',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Eligibility Criteria',iconAlign:'top',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                {
                    step: 6,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Outcomes',iconAlign:'top',
                    //action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                {
                    step: 7,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,iconAlign:'top',
                    text: 'Recruitment Centre',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                {
                    step: 8,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Ethics Approval',iconAlign:'top',
                  //  action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                {
                    step: 9,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,iconAlign:'top',
                    text: 'Funding Sources',
                    //action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },{
                    step: 10,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,iconAlign:'top',
                    text: 'Collaborators',
                    //action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                
                {
                    step: 11,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,iconAlign:'top',
                   
                    text:'Clinical Trial Personnel',
                  //  action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
                },
                
                {
                    step: 12,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,iconAlign:'top',
                    text: ' Documentation/Reports ',
                    //action: 'quickNav',
                    handler: 'quickNavCtrRegistryDetails'
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
                    name: 'prev_btn',
                    handler: 'onPrevCardClickCtrRegDetails'
                },
                '->','->',{
                    text: 'Save Clinical Registry Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    hidden: true,
                    name: 'save_clinicalregdetails',
                   
                },{
                    text: 'Save Secondary Id(s)',
                    ui: 'soft-purple',hidden: true,
                    iconCls: 'fa fa-save',
                    panelfrm: 'ctrregistrysecondaryidsfrm',
                    action_url: 'clinicaltrial/save_clinicalseconaryids',
                    name: 'save_clinicalseconaryids',
                   
                },{
                    text: 'Save Study Design',
                    ui: 'soft-purple',hidden: true,
                    iconCls: 'fa fa-save',
                    panelfrm: 'ctrregistrystudydesignfrm',
                    action_url: 'clinicaltrial/save_clinicalstudyDesign',
                    name: 'save_clinicalstudyDesign',
                   
                },{
                    text: 'Save Eligibility Criteria',
                    ui: 'soft-purple',hidden: true,
                    iconCls: 'fa fa-save',
                    panelfrm: 'ctrregistryeligibilitycriteriafrm',
                    action_url: 'clinicaltrial/save_clinicaleligibilitycriteria',
                    name: 'save_clinicaleligibilitycriteria',
                   
                },{
                    text: 'Save Funding Source',
                    ui: 'soft-purple',hidden: true,
                    iconCls: 'fa fa-save',
                    panelfrm: 'ctrregistryfundingsourcefrm',
                    action_url: 'clinicaltrial/save_clinicalfundingsource',
                    name: 'save_clinicalfundingsource',
                   
                },{
                    text: 'Save Collaborators',
                    ui: 'soft-purple',hidden: true,
                    iconCls: 'fa fa-save',
                    panelfrm: 'ctrregistrycollaboratorssfrm',
                    action_url: 'clinicaltrial/save_clinicalcollaborators',
                    name: 'save_clinicalcollaborators',
                   
                },
            
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-check',
                    name: 'submit_btn',
                    storeID: 'onlineclinicaltrialstr',
                    winWidth: '50%',
                    hidden: true,
                    disabled: true,
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
                    name: 'next_btn',
                    handler: 'onNextCardClickCtrRegDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});