Ext.define('Admin.view.pv.views.grids.PvPeerMeetingApplicationListGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'pvPeerMeetingApplicationListGrid',
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
    },'->',{
        xtype: 'button',
        text: 'Save Meeting Details',
        iconCls: 'fa fa-save',
        ui: 'soft-blue',
        name: 'save_btn',
        table_name: 'tra_pv_applications',
        toaster: 1
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
                storeId: 'pvMeetingApplicationListGridStr',
                proxy: {
                    url: 'pv/getStagePvApplications',
                    
                }
            },
            isLoad: true
        },
        afterrender: function(grid){
        	var is_meeting = grid.is_meeting;
        	if(is_meeting == 1){
        		var save_btn = grid.down('button[name=save_btn]');
        		save_btn.setVisible(false);
        	}

        },
        beforeselect: function(sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                panel = grid.up('panel'),
                stage_category_id = record.get('stage_category_id'),
                selCount = grid.getSelectionModel().getCount(),
            	decision_id = record.get('recommendation_id');
            if(stage_category_id == 8){
            	if (decision_id == 1 || decision_id == 2) {
	            	if(selCount > 0 ){
	            		panel.down('button[name=process_submission_btn]').setDisabled(false);
	            	}
	            }else{
	            	return false;
	                panel.down('button[name=process_submission_btn]').setDisabled(true);
	            }
            }
         },
         select: function(sel, record, index, eOpts) {
         	var me = this,
                grid = sel.view.grid,
                panel = grid.up('panel'),
                selCount = grid.getSelectionModel().getCount();
                
            if(selCount > 0 ){
        		panel.down('button[name=process_submission_btn]').setDisabled(false);
        	}else{
        		panel.down('button[name=process_submission_btn]').setDisabled(true);
        	}
         },
         deselect: function(sel, record, index, eOpts) {
         	var me = this,
                grid = sel.view.grid,
                panel = grid.up('panel'),
                selCount = grid.getSelectionModel().getCount();
                
            if(selCount > 0 ){
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
    	iconCls: 'x-fa fa-print',
    	handler: ''
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
	        dataIndex: 'recommendation_id',
	        text: 'Peer Recommendation',
	        name: 'recommendation_id',
	        width: 150,
	        renderer: function (value, metaData, record) {
	            if(record.get('stage_category_id') == 10 || record.get('stage_category_id') == 11){
	            	return "Check under Options";
	            }
	            else if (value == 1) {
	                metaData.tdStyle = 'color:white;background-color:green';
	                return "Recommended";
	            }else if(value == 2){
	            	metaData.tdStyle = 'color:white;background-color:red';
	            	return "Not Recommended";
	            }else{
	            	metaData.tdStyle = 'color:white;background-color:grey';
	            	return "Pending";
	            }
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
		                text: 'Peer Recommendation',
		                iconCls: 'fa fa-clipboard-check',
		                name: 'peer_recommendation',
		                ui: 'soft-blue',
		                hidden: true,
		                // review_type: 1,
		                handler: 'showRecommendationWin'
		            },{
		                text: 'Peer Members Recommendations',
		                iconCls: 'fa fa-clipboard-check',
		                name: 'rc_recommendation_log',
		                ui: 'soft-blue',
		                hidden: true,
		                handler: 'showRCMemberRecommendationLogsWin'
		            },{
		                text: 'View Application Details',
		                iconCls: 'fa fa-eye',
		                name: 'more_app_details',
		                ui: 'soft-blue',
		                isReadOnly: true,
		                handler: 'showSelectedApplicationMoreDetails'
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
	            	is_meeting = grid.is_meeting,
	            	stage_category_id = rec.get('stage_category_id');
	            if (is_meeting === 0 || is_meeting == 0) {
	                widget.down('menu menuitem[name=peer_recommendation]').setVisible(false);;
	            } 
	            else {
	            	widget.down('menu menuitem[name=peer_recommendation]').setVisible(true);
	            }
	            if(stage_category_id == 10 || stage_category_id == 11){//report preparation
	            	widget.down('menu menuitem[name=peer_recommendation]').setVisible(false);
	            	//widget.down('menu menuitem[name=view_rc_report]').setVisible(true);
	            	//disable participant updates 
	            	if(widget.up('grid')){
	            		if(widget.up('grid').up('panel')){
	            			if(widget.up('grid').up('panel').down('button[name=update_attendance]')){
	            				widget.up('grid').up('panel').down('button[name=update_attendance]').setVisible(false);
	            			}
	            		}
	            	}
	            	
	            	//hide recom column
	            }
            }
    }],
});
