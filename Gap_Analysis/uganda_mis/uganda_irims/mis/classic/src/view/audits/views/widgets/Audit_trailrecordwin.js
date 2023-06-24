Ext.define('Admin.view.administration.views.widgets.Audit_trailrecordwin',{
    extend:'Ext.window.Window',
    alias: 'widget.audit_trailrecordwin',
    modal: true,
    viewModel: 'admin_vmd',
    bodyPadding: 4,
    width:950,
    height:450,
    layout:'fit',
        items:[
        {
            xtype:'grid',
            store:'audit_trailStr',
            tbar:[{
                xtype: 'exportbtn',
            }],
            features: [{
                ftype: 'searching',
                minChars: 2,
                mode: 'local'
            }],
            columns:[{
                xtype:'rownumberer'
            },{
                header:'Action',
                dataIndex:'table_action',
                flex:0.2
            },{
                    header:'Previous Data',
                    dataIndex:'prev_tabledata',
                    tdCls:'wrap-textmargin',
                    flex:0.4
            },{
                 header:'Current Data',
                    dataIndex:'current_tabledata', tdCls:'wrap-textmargin',
                    flex:0.4
            },{
                header:'Action By',
                dataIndex:'action_by',
                flex:0.3
            },{
                 header:'Action On',
                dataIndex:'created_at',
                flex:0.3
            },{
                header:'IP Address',
                dataIndex:'ip_address',
                flex:0.3

            }]
        }
    ]
});