Ext.define('Admin.view.frontoffice.gmp.grids.GmpInspectionTeamGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gmInspectionTeamGrid',
    scroll: true,
    width: '100%',
    title: 'Inspection Team Details',
     viewConfig: {
            emptyText: 'No information found for the inspection team'
        },
   // bbar: [{
   //      xtype: 'pagingtoolbar',
   //      width: '100%',
   //      displayInfo: true,
   //      displayMsg: 'Showing {0} - {1} of {2} total records',
   //      emptyMsg: 'No Records'
   //  }],
     listeners: {
        beforerender: {
            fn: 'setConfigCombosStore',
            config: {
                pageSize: 1000,
                storeId: 'gmpInspectionTeamgridStr',
                proxy: {
                    url: 'openoffice/getGMPInspectionTeam',
                }
            },
            isLoad: false
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 50
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspectionteam_name',
        text: 'Inspection Team Name',
        width: 150,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspectionteam_desc',
        text: 'Inspection Description',
        width: 150,
        tdCls: 'wrap'
    },
    {
        xtype: 'datecolumn',
        format: 'Y-m-d',
        dataIndex: 'inspection_type',
        text: 'Inspecton Type',
        width: 150,
        tdCls: 'wrap'
    },
    {
        xtype: 'datecolumn',
        format: 'Y-m-d',
        dataIndex: 'start_date',
        text: 'Start Date',
        width: 150,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'end_date',
        text: 'End Date',
        width: 150,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'inspectioncountry_list',
        text: 'Inspection Countries',
        width: 150,
        tdCls: 'wrap'
    }
    ]
});
