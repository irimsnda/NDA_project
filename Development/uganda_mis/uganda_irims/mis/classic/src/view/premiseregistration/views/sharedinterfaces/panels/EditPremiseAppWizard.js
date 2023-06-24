/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.EditPremiseAppWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.editpremiseappwizard',
    viewModel: 'premiseregistrationvm',
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
            xtype: 'premisedetailstabpnl',
            tbar:[ {
                xtype: 'button',
                iconCls: 'x-fa fa-search',
                tooltip: 'Search',
                text: 'Seach Premises Application',
                action: 'search_premise',
                ui: 'soft-red',
                childXtype: 'premiseselectiongrid',
                winTitle: 'Premises Selection List',
                winWidth: '90%',
                margin: '30 0 0 0'
            }]
            
            //applicationpremisepnl'
        },
        {
            xtype: 'premregappdocuploadsgenericgrid'
        },
        {
            xtype: 'producteditvariationrequestsgrid'
        },{
            xtype: 'applicationapplicantpnl',
            hidden: true
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
                // {
                //     step: 0,
                //     iconCls: 'fa fa-user',
                //     enableToggle: true,
                //     pressed: true,
                //     text: 'APPLICANT DETAILS',
                //     action: 'quickNav'
                // },
                {
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'PREMISE DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Variation Request',
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
                    name: 'prev_btn',
                    handler: 'onPrevCardClickMoreDetails'
                },
                '->',
                {
                    text: 'Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    handler: 'savePremiseEditAppBaseDetails',
                    toaster: 1
                },
                {
                    text: 'Save Screening Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    //handler: 'saveApplicationScreeningDetails',
                    hidden: true
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    // bind: {
                    //     disabled: '{atEnd}'
                    // },
                    name: 'next_btn',
                    handler: 'onNextCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
