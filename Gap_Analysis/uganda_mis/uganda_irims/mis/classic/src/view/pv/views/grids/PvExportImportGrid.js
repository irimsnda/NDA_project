Ext.define('Admin.view.pv.views.grids.PvExportImportGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'pvExportImportGrid',
    cls: 'dashboard-todo-list',
    // header: false,
    controller: 'pvvctr',
    autoScroll: true,
    // autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No Applications Found',
    },
    
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            var grid = this.up('grid'),
                pnl = grid.up('panel'),
                module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
                application_code = pnl.down('hiddenfield[name=active_application_code]').getValue(),
                workflow_stage_id = pnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
                store = this.getStore();
            store.removeAll();
            store.getProxy().extraParams = {
                application_code: application_code,
                module_id: module_id,
                workflow_stage_id: workflow_stage_id
            }
        }
    }],

    selModel:{
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 100,
                storeId: 'pvManagerAllocationGridStr',
                proxy: {
                    url: 'pv/getStagePvApplications',
                    
                }
            },
            isLoad: true
        },
        select: function(sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                panel = grid.up('panel'),
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                panel.down('button[name=process_submission_btn]').setDisabled(false);
            }else{
                panel.down('button[name=process_submission_btn]').setDisabled(true);
            }
    
         }
    },
    tbar: [{
    	xtype: 'button',
    	text: 'Export(Importable Excel Format)',
    	ui: 'soft-blue',
    	iconCls: 'x-fa fa-file-download',
    	handler: 'exportADR'
    },{
    	xtype: 'button',
    	text: 'Import (Importable Excel Format)',
    	ui: 'soft-blue',
    	iconCls: 'x-fa fa-file-import',
    	winTitle: 'Import ADR list from Excel/CSV',
		winWidth: '50%',
    	storeId: 'pvManagerAllocationGridStr',
    	handler: 'showExcelImportFrm'
    }],
    columns: [{
	    	xtype: 'rownumberer'
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'tracking_no',
	        text: 'Tracking No',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'adr_type',
	        text: 'Report Type',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'patient_name',
	        text: 'Patient Name',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'applicant_name',
	        text: 'Reporter',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'date_added',
	        text: 'Date Received',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'submitted_by',
	        text: 'Submitted By',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'submitted_on',
	        text: 'Submitted On',
	        flex: 1
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'is_exported',
	        text: 'Exported',
	        width: 100,
	        renderer: function (value, metaData) {
	            if (value == 1) {
	                metaData.tdStyle = 'color:white;background-color:green';
	                return "Yes";
	            }
	            metaData.tdStyle = 'color:white;background-color:gray';
	            return "Pending";
	        }
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'is_published',
	        text: 'Published',
	        width: 100,
	        renderer: function (value, metaData) {
	            if (value == 1) {
	                metaData.tdStyle = 'color:white;background-color:green';
	                return "Yes";
	            }
	            metaData.tdStyle = 'color:white;background-color:gray';
	            return "Pending";
	        }
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'is_reporter_notified',
	        text: 'Reporter is Notified',
	        width: 100,
	        renderer: function (value, metaData) {
	            if (value == 1) {
	                metaData.tdStyle = 'color:white;background-color:green';
	                return "Yes";
	            }
	            metaData.tdStyle = 'color:white;background-color:gray';
	            return "Pending";
	        }
	    },{
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
	                items: [{
		                text: 'Notify Reporter',
		                iconCls: 'fa fa-mail-bulk',
		                name: 'notify_reporter',
		                ui: 'soft-blue',
		                childXtype: 'pvResponseFrm',
		                isReadOnly: true,
		                handler: 'notifyReporter'
		            },{
		                text: 'Publish Report',
		                iconCls: 'fa fa-bullhorn',
		                name: 'publish_report',
		                ui: 'soft-blue',
		                childXtype: 'pvResponseFrm',
		                isReadOnly: true,
		                handler: 'publishReport'
		            },{
	                    text: 'View Processing Recommendations',
	                    iconCls: 'fa fa-clipboard-list',
	                    tooltip: 'view process recommendations',
	                    name: 'view_recommendation',
	                    winWidth: '70%',
	                    ui: 'soft-blue',
	                    handler: 'viewApplicationRecommendationLogs',
	                    stores: '[]'
	                },{
		                text: 'View Application Details',
		                iconCls: 'fa fa-eye',
		                name: 'more_app_details',
		                ui: 'soft-blue',
		                isReadOnly: true,
		                handler: 'showSelectedApplicationMoreDetails'
		            },{
	                    text: 'View Associated Documents',
	                    iconCls: 'fa fa-file-download',
	                    tooltip: 'View associated documents',
	                    action: 'view',
	                    winWidth: '70%',
	                    handler: 'showApplicationUploadedDocument',
	                    stores: '[]'
	                }
	                ]
	            }
	        },
	        onWidgetAttach: function (col, widget, rec) {
            var grid =widget.up('grid'),
            	is_published = rec.get('is_published');
            if (is_published === 1 || is_published == 1) {
                widget.down('menu menuitem[name=publish_report]').setVisible(false);
            } else{
                widget.down('menu menuitem[name=publish_report]').setVisible(true);
        	}
        }
    }],
});
