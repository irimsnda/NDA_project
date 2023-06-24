Ext.define('Admin.view.promotionmaterials.views.maininterfaces.grids.PromotionMaterialsManagerReviewGrid', {
	xtype:'promotionmaterialsmanagerreviewgrid',
    extend: 'Ext.grid.Panel',
    controller:'promotionmaterialviewcontroller',
    
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
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
                    table_name: 'tra_promotion_adverts_applications',
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
                    storeID: 'promotionmaterialapplicationstr',
                    table_name: 'tra_promotion_adverts_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
				
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setCustomPromotionMaterialGridsStore',
            config: {
               
                proxy: {
                    url: 'promotionmaterials/getManagerApplicationsGeneric'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'tracking_no',
            text: 'Tracking Number',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'reference_no',
            text: 'Ref Number',
            flex: 1
        },  {
            xtype: 'gridcolumn',
            text: 'From',
            dataIndex: 'from_user',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'To',
            dataIndex: 'to_user',
            flex: 1,
            tdCls: 'wrap'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'applicant_name',
            text: 'Applicant',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'applicant_name',
            text: 'Applicant',
            flex: 1
        },
    
        {
            xtype: 'gridcolumn',
            dataIndex: 'advertisement_type',
            text: 'Advertisement Type',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'description_of_advert',
            text: 'Description of Advertisement',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'venue_of_exhibition',
            text: 'Venue of the Advertisement/Exhibition',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'exhibition_start_date',
            text: ' Advertisement/Exhibition Start Date',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'exhibition_start_date',
            text: ' Advertisement/Exhibition End Date',
            flex: 1
        },  {
            xtype: 'gridcolumn',
            dataIndex: 'sponsor_name',
            text: 'Sponsor Name',
            flex: 1
        }, 	
        {
            xtype: 'gridcolumn',
            dataIndex: 'workflow_stage',
            text: 'Workflow Stage',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'application_status',
            text: 'Application Status',
            flex: 1,
            tdCls: 'wrap'
        }, {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_received',
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
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
                                text: 'Evaluation',
                                iconCls: 'x-fa fa-exchange',
                                menu: {
                                    xtype: 'menu',
                                    items: [{
                                            text: 'Documents',
                                            iconCls: 'x-fa fa-upload',
                                            childXtype: 'premregappprevdocuploadsgenericgrid',
                                            winTitle: 'Evaluation uploaded Documents',
                                            winWidth: '80%',
                                            handler: 'showPreviousUploadedDocs',
                                            target_stage: 'evaluation'
                                        },
                                        {
                                            text: 'Comments',
                                            iconCls: 'x-fa fa-weixin',
                                            childXtype: 'applicationprevcommentsgrid',
                                            winTitle: 'Evaluation Comments',
                                            winWidth: '60%',
                                            handler: 'showPreviousComments',
                                            stores: '[]',
                                            comment_type_id: 2,
                                            target_stage: 'evaluation',
                                            isWin: 1
                                        }
                                    ]
                                }
                            },
                            {
                                text: 'Preview Application Details',
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Preview Record',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Promotional & Advertisements Information',
                                winWidth: '40%',
                                isReadOnly:1,
                                handler: 'showPromotionAndAdvertsApplicationMoreDetailsOnDblClick'
                            },{
                                text: 'Application Documents',
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Application Documents',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Application Documents',
                                winWidth: '40%',
                                isReadOnly: 1,
                                document_type_id: '',
                                handler: 'showPreviousUploadedDocs'
                            },  {
                                text: 'Preview Application Queries',
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Preview Record',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Preview Application Queries',
                                winWidth: '40%',
                                isReadOnly: 1,
                                handler: 'previewproductApplicationQueries'
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
