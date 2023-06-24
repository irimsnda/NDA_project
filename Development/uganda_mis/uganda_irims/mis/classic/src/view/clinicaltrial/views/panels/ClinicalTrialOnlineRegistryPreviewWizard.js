/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialOnlineRegistryPreviewWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.clinicaltrialonlineregistrypreviewwizard',
    
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
                //layout:'fit',
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
        },
        {
            xtype: 'clinicaltrialonlinescreeninggrid'
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
                    pressed: true,
                    text: 'APPLICANT ',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: 'Clinical Trial Registry ',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Secondary Id(s)',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-plus-square',
                    enableToggle: true,
                    text: 'Study Design ',
                  //  action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'Interventions',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Eligibility Criteria',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                {
                    step: 6,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Outcomes',
                    //action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                {
                    step: 7,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Recruitment Centre',
                   // action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                {
                    step: 8,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Ethics Approval',
                  //  action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                {
                    step: 9,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Funding Sources',
                    //action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },{
                    step: 10,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Collaborators',
                    //action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                
                {
                    step: 11,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                   
                    text:'Clinical Trial Personnel',
                  //  action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
                },
                
                {
                    step: 12,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: ' Documentation/Reports ',
                    //action: 'quickNav',
                    handler: 'quickNavCtrRegistryOnlineDetails'
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
                    handler: 'onPrevCardClickCtrRegOnlineDetails'
                },'->',{
                    text: 'Save Clinical Registry Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    hidden: true,
                    panelfrm: '',
                    action_url: 'clinicaltrial/save_clinicalregdetails',
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
                   
                },{
                    text: 'Save Pre-Checking Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-check',
                    name: 'submit_btn',
                    storeID: 'onlineclinicaltrialstr',
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
                    name: 'next_btn',
                    handler: 'onNextCardClickCtrRegOnlineDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
