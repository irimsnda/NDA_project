Ext.define('Admin.view.promotionmaterials.views.maininterfaces.grids.PromotionAndAdvertsCommunicationsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'promotionmaterialviewcontroller',
    xtype: 'promotionandadvertscommunicationsgrid',
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
            fn: 'custStoreConfig',
            config: {
                pageSize: 10000,
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
    columns: [{
        xtype: 'widgetcolumn',
        text: 'Print',
        widht: 150,
        widget: {
            xtype: 'button',
            iconCls: 'x-fa fa-certificate',
            ui: 'soft-green',
            text: 'Print Certificate',
            name: 'certificate',
            tooltip: 'Print  Certificate',
            backend_function: 'generatePromotionalRegCertificate',
            handler: 'generatePromotionalRegCertificate'
        }
    },
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
        xtype: 'gridcolumn',
        dataIndex: 'approval_status',
        text: 'DG Recommendation',
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
                        text: 'Update Signatory',
                        iconCls: 'x-fa fa-pencil',
                        stores: '["approvaldecisionsstr"]',
                        table_name: 'tra_promotion_adverts_applications',
                        is_update: 1,
                        hidden: true,
                        handler: 'getApplicationApprovalDetails'
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'showPromotionAndAdvertApplicationMoreDetails'
                    }
                ]
            }
        }
    }]
});
