/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialMeetingGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ClinicalTrialManagersAbstractGrid',
    xtype: 'clinicaltrialmeetinggrid',
    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialManagerMeetingApplications'
                }
            },
            isLoad: false
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }],
    bbar:[{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        table_name: 'tra_premises_applications',
        width: '50%',
        strict_mode: 0,
        doRefresh: function () {
            var store = this.getStore();
            store.removeAll();
            store.load();
        },
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    },
    '->', {
        xtype: 'button',
        text: 'Uploaded Meeting Documents',
        iconCls: 'x-fa fa-upload',
        ui: 'soft-purple',
        name: 'save_btn', isReadOnly: 1,
        reference_table_name: 'tc_meeting_details',
        table_name: 'tc_meeting_uploaddocuments',
        handler: 'funcUploadTCMeetingtechnicalDocuments',
        document_type_id: 4,
        childXtype:'unstructureddocumentuploadsgrid',
        winTitle: 'Technical Meeting Documents Upload',
        winWidth: '80%',
        toaster: 0
    }],
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
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Assessment Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Audit Recommendation',
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
                items: [ {
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
                }, {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showClinicalTrialApplicationMoreDetails'
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