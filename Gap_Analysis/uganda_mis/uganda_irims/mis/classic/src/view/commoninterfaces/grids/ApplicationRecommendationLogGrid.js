/**
 */
Ext.define('Admin.view.commoninterfaces.grids.ApplicationRecommendationLogGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationRecommendationLogGrid',
    controller: 'commoninterfacesVctr',
    autoScroll: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }],
    plugins: [{
        ptype: 'gridexporter'
    }],
    features: [{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Service Type => {[values.rows[0].data.recommendation]} ({rows.length})',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'applicationRecommendationLogGridStr',
                groupField: 'recommendation_id',
                proxy: {
                    url: 'common/getApplicationRecommendationLogs'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
        text: 'S/N'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        text: 'Remarks',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'stage_name',
        text: 'Process',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'recommendation_date',
        text: 'Recommendation Date',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'recommendation_id',
        text: 'Recommendation',
        align: 'center',
        flex: 1,
        // hidden: false,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Recommended";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Not Recommended";
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                module_id = grid.down('hiddenfield[name=module_id]').getValue();

            store.getProxy().extraParams = {
                application_code: application_code,
                module_id: module_id
            };
        }
    }]
});
