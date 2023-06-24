/**
 * Created by sotclans.
 */
Ext.define('Admin.view.commoninterfaces.grids.CapaFindingChecklistGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'capafindingchecklistgrid',
    cls: 'dashboard-todo-list',itemId:'checklistItemsQueriesGrid',
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
        }
    },
    selType: 'cellmodel',
    plugins: [{
        ptype: 'gridexporter'
    },{
        ptype: 'filterfield'
    }],
    export_title: 'Checklist',
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '=> {[values.rows[0].data.deficiency_category]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
       
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 100,
                storeId: 'capafindingcheckliststr',
                groupField: 'deficiency_category',
                proxy: {
                    url: 'api/getInspectionCapaFindingChecklists'
                }
            },
            isLoad: true
        },
        afterrender:function(grid){
                var panel = grid.up('panel'),
                    status = panel.down('form').down('hiddenfield[name=status]').getValue();

                    if(status == 1 || status < 1){
                            grid.columns[2].setHidden(true);
                            grid.columns[3].setHidden(true);
                        
                    }
                    console.log(status)
        }
    },
    
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'deficiency_category',
        text: 'Deficiency Category',
        tdCls: 'wrap-text', 
        flex: 1
    },{
        text : 'Deficiencies Details',
		flex : 2,
        columns:[{
            xtype: 'gridcolumn', 
            tdCls: 'wrap-text',   
            dataIndex: 'deficiencies',
            text: 'Deficiencies', 
            tdcls: 'editor-text',
            flex: 1
        }, {
            xtype: 'gridcolumn', 
            tdCls: 'wrap-text',   
            dataIndex: 'deficiency_references',
            text: 'Deficiencies References', 
            tdcls: 'editor-text',
            flex: 1
        }]

    },  {
        text : 'Manufacturers/Premises Responses',
		flex : 3,
        columns:[{
            xtype: 'gridcolumn', 
            tdCls: 'wrap-text',   
            text:'Root cause Analysis',flex : 1,
            dataIndex: 'root_causeanalysis'
        },{
            xtype: 'gridcolumn', 
            tdCls: 'wrap-text',   flex : 1,
            text:'Correction and proposed corrective actions ',
            dataIndex: 'corrective_actions'
        },{
            xtype: 'gridcolumn', 
            tdCls: 'wrap-text',   flex : 1,
            text:'The steps that have or will be taken for the demonstration of the effectiveness of the actions taken ',
            dataIndex: 'corrective_actionssteps'
        },{
            xtype: 'gridcolumn', 
            tdCls: 'wrap-text', flex : 1,
            text:' Completion Date Timeline',
            dataIndex:'completion_date'
        }]
    },
     {
        xtype: 'gridcolumn', 
        text : 'Inspectors Use',
		flex : 2,
        columns:[{
            xtype: 'gridcolumn', 
            tdCls: 'wrap-text', flex : 1,
            text:'Inspectors Remarks',
            dataIndex:'inspectors_remarks'
        },{
            xtype: 'gridcolumn', 
            tdCls: 'wrap-text', flex : 1,
            text:'Response Acceptable Yes/No',
            dataIndex:'inspectors_acceptance_id'
        }]
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    handler: 'onEditApplicationsCAPAFindings',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    //disabled: true,
                    table_name: 'tra_inspectioncapa_deficiencies',
                    handler: 'onDeleteApplicationCAPAfindings',
                    stores: '[]'
                }
                ]
            }
        }
    }],
    tbar:[{
           text:'Add (Finding)Item',
            ui: 'soft-green',
            iconCls: 'x-fa fa-plus',
            margin:5,
            storeID: 'applicationqueriesstr',
            handler: 'showAddchecklistitemscapafrm',
    }],
    bbar: [{
        xtype: 'button',
        text: 'Back',
        ui: 'soft-green',
        iconCls: 'x-fa fa-backward',
        nextStep: 0,
        handler: 'navigateQueryWizard'
    },{
        xtype: 'pagingtoolbar',
        width: '60%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                store= grid.getStore(),
                // pnl = grid.up('panel'),
                panel = grid.up('panel'),
                inspection_capa_id = panel.down('hiddenfield[name=inspection_capa_id]').getValue();
                store.removeAll();
                store.getProxy().extraParams = {
                    inspection_capa_id: inspection_capa_id,
                        pass_status: 2
                };
        }
    },'->',{
        xtype: 'button',
        text: 'Update Queries',
        ui: 'soft-green',
        iconCls: 'x-fa fa-save',
        formBind: true,
        hidden: true,
        action: 'save_query',
        action_url: 'api/addChecklistItemsQueries',
        handler: 'addChecklistToQuery'
    },
    {
        xtype: 'button',
        text: 'Next',
        ui: 'soft-green',
        iconCls: 'x-fa fa-forward',
        nextStep: 2,
        handler: 'navigateQueryWizard'
    }]
});
