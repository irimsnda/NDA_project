/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialManagerAuditingGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ClinicalTrialManagersAbstractGrid',
    xtype: 'clinicaltrialmanagerauditinggrid',

    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialManagerApplicationsGeneric'
                }
            },
            isLoad: true
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_clinical_trial_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    table_name: 'tra_clinical_trial_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'sponsor',
        text: 'Sponsor',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'investigator',
        text: 'Investigator',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Assessment',
                        iconCls: 'x-fa fa-sliders',
                        menu: {
                            xtype: 'menu',
                            items: [
                                
                                {
                                    text: 'Uploads',
                                    iconCls: 'x-fa fa-upload',
                                    childXtype: 'clinicaltrialprevdocuploadsgenericgrid',
                                    winTitle: 'Assessment uploaded Documents',
                                    winWidth: '80%',
                                    handler: 'showPreviousUploadedDocs',
                                    target_stage: 'assessment'
                                },
                                {
                                    text: 'Comments',
                                    iconCls: 'x-fa fa-weixin',
                                    childXtype: 'applicationprevcommentsgrid',
                                    winTitle: 'Assessment Comments',
                                    comment_type_id: 4,
                                    winWidth: '60%',
                                    name: 'prev_comments',
                                    handler: 'showApplicationComments',
                                    stores: '[]'
                                }
                            ]
                        }
                    },
                    {
                        text: '2nd Assessment ',
                        hidden: true,
                        iconCls: 'x-fa fa-sliders',
                        menu: {
                            xtype: 'menu',
                            items: [
                                
                                {
                                    text: 'Uploads',
                                    iconCls: 'x-fa fa-upload',
                                    childXtype: 'clinicaltrialprevdocuploadsgenericgrid',
                                    winTitle: 'Auditing uploaded Documents',
                                    winWidth: '80%',
                                    handler: 'showPreviousUploadedDocs',
                                    target_stage: 'auditing'
                                },
                                {
                                    text: 'Comments',
                                    iconCls: 'x-fa fa-weixin',
                                    childXtype: 'applicationprevcommentsgrid',
                                    winTitle: 'Auditing Comments',
                                    winWidth: '60%',
                                    name: 'prev_comments',
                                    handler: 'showApplicationComments',
                                    comment_type_id: 3,
                                    stores: '[]'
                                }
                            ]
                        }
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showClinicalTrialApplicationMoreDetails'
                    },{
                        text: 'All Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '40%',
                        isReadOnly: 1,
                        document_type_id: '',
                        handler: 'showPreviousUploadedDocs'
                    },{
                        text: 'View Screening Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                        handler: 'showApplicationChecklists'
                    }
                ]
            }
        }
    }]
});