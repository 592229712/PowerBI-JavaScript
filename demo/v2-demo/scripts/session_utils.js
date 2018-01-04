var _session = {};

const SessionKeys = {
    AccessToken : "accessToken",
    EmbedUrl : "embedUrl",
    EmbedId : "embedId",
    DashboardId : "dashboardId",
    GroupId : "groupId",
    IsSampleReport: "isSampleReport",
    IsSampleDashboard: "IsSampleDashboard",
    IsSampleTile: "IsSampleTile",
    IsSampleQna: "IsSampleQna",
    EmbedMode: "embedMode",
    TokenType: "tokenType",
    EntityType: "entityType",
    SampleId: "SampleId",
    PageName: "PageName",
    VisualName: "VisualName"
};

function GetParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function SetSession(key, value) {
    // This is a temporal solution for session (which is cleared on reload). Should be replaced with a real session.
    _session[key] = value;
}

function GetSession(key) {
    // This is a temporal solution for session (which is cleared on reload). Should be replaced with a real session.
    return _session[key];
}

function UpdateSession(button, sessionKey) {
    var value = $(button).val();
    if (value)
    {
        SetSession(sessionKey, value);
    }
}

function SetTextboxFromSessionOrUrlParam(sessionKey, textboxSelector) {
    var value = GetParameterByName(sessionKey);
    if (!value)
    {
        value = GetSession(sessionKey);
    }
    $(textboxSelector).val(value);
}

function SetTextBoxesFromSessionOrUrlParam(accessTokenSelector, embedUrlSelector, embedIdSelector, dashboardIdSelector) {
    var accessToken = GetParameterByName(SessionKeys.AccessToken);
    if (!accessToken)
    {
        accessToken = GetSession(SessionKeys.AccessToken);
    }

    var embedUrl = GetParameterByName(SessionKeys.EmbedUrl);
    if (!embedUrl)
    {
        embedUrl = GetSession(SessionKeys.EmbedUrl);
    } else {
        var groupId = GetParameterByName(SessionKeys.GroupId);
        if(groupId)
        {
            if (embedUrl.indexOf("?") != -1)
            {
              embedUrl += "&groupId=" + groupId;
            } else {
              embedUrl += "?groupId=" + groupId;
            }
        }
    }

    var embedId = GetParameterByName(SessionKeys.EmbedId);
    if (!embedId)
    {
        embedId = GetSession(SessionKeys.EmbedId);
    }

    var tokenType = GetParameterByName(SessionKeys.TokenType);
    if (!tokenType)
    {
        tokenType = GetSession(SessionKeys.TokenType);
    }

    var dashboardId = GetParameterByName(SessionKeys.DashboardId);
    if (!dashboardId) {
        dashboardId = GetSession(SessionKeys.DashboardId);
    }

    $(accessTokenSelector).val(accessToken);
    $(embedUrlSelector).val(embedUrl);
    $(embedIdSelector).val(embedId);
    $(dashboardIdSelector).val(dashboardId);

    //
    // Set the embed type (Saas or Embed token)
    //
    var embedTypeRadios = $('input:radio[name=tokenType]');
    embedTypeRadios.filter('[value=' + tokenType + ']').prop('checked', true);
}
