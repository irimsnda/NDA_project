Ext.define('Admin.view.configurations.views.forms.DirectorateDirectorsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'directoratedirectorsFrm',
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
        value: 'tra_directorate_directors',
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
        fieldLabel: 'Directorate',
        margin: '0 20 20 0',
        name: 'directorate_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_directorates'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'User Name',
        margin: '0 20 20 0',
        name: 'user_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'first_name',
        forceSelection: true,
        typeAhead: true,
        queryMode: 'local',
        tpl: '<tpl for="."><div class="x-boundlist-item" >{first_name} {last_name}</div></tpl>', 
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'usermanagement/getActiveSystemUsers',
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'datefield',
        fieldLabel: 'Start Date',
        margin: '0 20 20 0',
        format: 'Y-m-d',
        name: 'start_date',
        allowBlank: false
    },{
        xtype: 'datefield',
        fieldLabel: 'End Date',
        margin: '0 20 20 0',
        format: 'Y-m-d',
        name: 'end_date',
        allowBlank: false
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Current Director',
        margin: '0 20 20 0',
        name: 'is_current_director',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
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
                    table_name: 'tra_directorate_directors',
                    storeID: 'directoratedirectorsStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});