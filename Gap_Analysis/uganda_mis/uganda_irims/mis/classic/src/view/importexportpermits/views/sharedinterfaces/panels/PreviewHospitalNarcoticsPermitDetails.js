/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.PreviewHospitalNarcoticsPermitDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.previewhospitalnarcoticspermitdetails',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    viewModel: {
        type: 'importexportpermitsvm'
    },
    controller: 'importexportpermitsvctr',
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    items: [
        {
            xtype: 'hospitalnarcoticspermitsdetailspnl',//onlinefoodproductsdetailspnl
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'top',
                    margin: 3,
                    items: [
                        {
                            xtype: 'tbseparator',
                            width: 2
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Zone',
                            labelWidth: 50,
                            width: 400,
                            name: 'zone_id',
                            valueField: 'id',
                            displayField: 'name',
                            queryMode: 'local',
                            readOnly: true,
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
                        }
                    ]
                }
            ],
        },{
            xtype: 'importexportapplicantdetailsfrm',
            title: 'APPLICANT DETAILS'
        }, {
            xtype: 'tabpanel',
            items: [{
                xtype: 'importexportdocuploadsgrid',
                title: 'Documents Submission'
            }]
        },{
            xtype: 'importexportscreeninggrid',
            title: 'Import/Export Permit Prechecking'
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        }
    ],
    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            style: {
                "background-color": "#90c258"
            },
            bodyStyle: {
                "background-color": "#90c258"
            },
            layout: {
                pack: 'center'
            },
            items: [{
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Narcotics Drugs Permit Details',
                    action: 'quickNav', 
                    wizard: 'previewhospitalnarcoticspermitdetails',
                    handler: 'prevquickNavigation'
                },{
                    step: 1,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'Applicant',
                    action: 'quickNav',
                    wizard: 'previewhospitalnarcoticspermitdetails',
                    handler: 'prevquickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Narcotics Drugs permit Documents Submission',
                    action: 'quickNav', 
                    wizard: 'previewhospitalnarcoticspermitdetails',
                    handler: 'prevquickNavigation'
                },{
                    step: 3,
                    iconCls: 'fa fa-product-hunt',
                    enableToggle: true,
                    text: 'Narcotics Drugs Permit Checklist',
                    action: 'quickNav', 
                    wizard: 'previewhospitalnarcoticspermitdetails',
                    handler: 'quickNavigation'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Back to List',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'back_to_list',
                    hidden: true
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard:'previewhospitalnarcoticspermitdetails',
                    handler: 'prevonPrevCardClick'
                },
                {
                    text: 'Save/Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    hidden:true,
                    action_url: 'onSavePermitinformation',
                    wizard: 'previewhospitalnarcoticspermitdetails',
                    handler: 'savePermitInformation'
                },{
                    text: 'Save Screening Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    disabled:true,
                    hidden: true
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'previewhospitalnarcoticspermitdetails',
                    handler: 'prevonNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
