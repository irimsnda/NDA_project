Ext.define('Admin.view.configurations.views.forms.AuthorityDirectorsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'authoritydirectorsFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'authority_directors',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'Director',
        margin: '0 20 20 0',
        name: 'director_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'user_name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'configurations/getConfigDirectors',
                        extraParams:{
                            table_name: 'tra_directorate_directors'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'datefield',
        fieldLabel: 'Period From',
        margin: '0 20 20 0',
        format: 'Y-m-d',
        name: 'period_from',
        allowBlank: false
    },{
        xtype: 'datefield',
        fieldLabel: 'Period To',
        margin: '0 20 20 0',
        format: 'Y-m-d',
        name: 'period_to',
        allowBlank: false
    },{
        xtype: 'textarea',
        fieldLabel: 'Remarks',
        margin: '0 20 20 0',
        name: 'remarks',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        fieldLabel: 'Is Active',
        margin: '0 20 20 0',
        name: 'is_active',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'authority_directors',
                    storeID: 'authoritydirectorsStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});