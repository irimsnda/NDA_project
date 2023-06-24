/**
 * Created by Kip on 6/27/2019.
 */
Ext.define('Admin.view.usermanagement.views.grids.UsersSignsSetUpGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'userssignssetupgrid',
    header: false,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 60
    }, {
        xtype: 'displayfield',
        hidden: true,
        value: 'Double click to update signature details!!',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Active System Users Signs',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                pageSize: 100,
                storeId: 'userssignssetupstr',
                proxy: {
                    url: 'usermanagement/getUserSignatures'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'fullnames',
        text: 'Full Names',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Email Address',
        flex: 1,
        renderer: function (value) {
            return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'savedname',
        text: 'Signature',
        flex: 1,
        renderer: function (val) {
            if (val) {
                return '<img src="' + base_url + '/resources/images/signs/' + val + '" width="75" height="50">';
            } else {
                return '<img src="' + base_url + '/resources/images/signs/signature_placeholder.png" width="75" height="50">';
            }
        }
    }, {
        xtype: 'widgetcolumn',
        text: 'Options',
        width: 100,
        widget: {
            textAlign: 'left',
            xtype: 'splitbutton',
            ui: 'gray',
            width: 75,
            iconCls: 'x-fa fa-th-list',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Upload Signature',
                    iconCls: 'x-fa fa-upload',
                    tooltip: 'Update Signature',
                    handler: 'showUploadUserSignature'
                },{
                    text: 'Download Signature',
                    iconCls: 'x-fa fa-download',
                    tooltip: 'Download Signature',
                    action: 'edit',
                    disabled: true,
                    handler: 'showEditSystemUser',
                    form: 'addUserFrm'
                }, {
                    text: 'Delete Signature',
                    hidden: true,
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'users',
                    store: 'usersStore',
                    action: 'delete',
                    action_url: 'usermanagement/deleteUser',
                    handler: 'doDeleteUserParam'
                }
                ]
            }
        }

    }]
});
